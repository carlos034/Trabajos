#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <BluetoothSerial.h>

// Configuración WiFi
String ssid = "";
String password = "";

// Configuración del broker MQTT
const char* mqtt_server = "";
const int mqtt_port = ;
const char* mqtt_user = ""; // Si tu broker requiere autenticación
const char* mqtt_password = ""; // Si tu broker requiere autenticación

const int sensorPin = 34;  // Pin analógico donde está conectado el sensor de turbidez
#define relay1 5           // Define el pin del relé

WiFiClientSecure espClient;
PubSubClient client(espClient);
BluetoothSerial SerialBT;

String incomingMessage;       // Variable para almacenar el mensaje entrante
String incomingSSID;          // Variable para almacenar el SSID recibido
String incomingPassword;      // Variable para almacenar la contraseña recibida
bool receivingSSID = false;   // Indicador de si estamos recibiendo el SSID
bool receivingPassword = false; // Indicador de si estamos recibiendo la contraseña

void setup() {
  pinMode(sensorPin, INPUT);
  pinMode(relay1, OUTPUT);     // Configura el pin del relé como salida
  digitalWrite(relay1, HIGH);  // Asegúrate de que el relé está apagado al inicio
  Serial.begin(115200);        // Inicia la comunicación serial para depuración
  SerialBT.begin("ESP32_BT");  // Nombre del dispositivo Bluetooth

  // Conectar a WiFi
  connectToWiFi();

  // Configurar el servidor MQTT
  espClient.setInsecure(); // Si no estás utilizando un certificado
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);

  // Intentar conectar al broker
  reconnect();
}

void connectToWiFi() {
  Serial.println("Desconectando del WiFi actual...");
  WiFi.disconnect();
  Serial.println("Conectando a WiFi...");
  WiFi.begin(ssid.c_str(), password.c_str());

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado");
  Serial.print("Dirección IP: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  // Convertir el payload en un String
  String incomingPayload;
  for (unsigned int i = 0; i < length; i++) {
    incomingPayload += (char)payload[i];
  }

  // Procesar el mensaje recibido
  Serial.print("Mensaje recibido [");
  Serial.print(topic);
  Serial.print("]: ");
  Serial.println(incomingPayload);

  // Procesar los mensajes del tópico /data/relee
  if (String(topic) == "/data/relee") {
    if (incomingPayload == "on") {
      digitalWrite(relay1, LOW); // Enciende el relé
      Serial.println("Relé encendido por MQTT");
    } else if (incomingPayload == "off") {
      digitalWrite(relay1, HIGH); // Apaga el relé
      Serial.println("Relé apagado por MQTT");
    }
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Intentando conectar al broker MQTT...");
    if (client.connect("ESP32Client", mqtt_user, mqtt_password)) {
      Serial.println("Conectado");

      // Suscribirse a los topics relevantes
      if (client.subscribe("data/sensor")) {
        Serial.println("Suscripción exitosa a data/sensor");
      } else {
        Serial.println("Falló la suscripción a data/sensor");
      }

      if (client.subscribe("/data/relee")) {
        Serial.println("Suscripción exitosa a /data/relee");
      } else {
        Serial.println("Falló la suscripción a /data/relee");
      }
    } else {
      Serial.print("Fallo, rc=");
      Serial.print(client.state());
      Serial.println(" Intentar de nuevo en 5 segundos");
      delay(5000);
    }
  }
}

void publishData() {
  int sensorValue = analogRead(sensorPin);  // Lee el valor analógico del sensor
  
  // Convierte el valor analógico (0-4095) a voltaje (0-3.3V)
  float voltage = sensorValue * (3.3 / 4095.0);

  // Conversión básica de voltaje a NTU (esto puede variar según el sensor específico)
  float NTU = 0.0;
  if (voltage < 2.5) {
    NTU = 3000 * (2.5 - voltage) / 2.5; // Simplificación para ejemplo
  } else {
    NTU = 0;
  }

  // Determinar el estado del agua basado en NTU
  String waterState;
  if (NTU >= 0 && NTU <= 900) {
    waterState = "Agua sin agente contaminante";
  } else if (NTU > 900 && NTU <= 1500) {
    waterState = "Agua ligeramente limpia";
  } else if (NTU > 1500 && NTU <= 2000) {
    waterState = "Agua medio contaminada";
  } else if (NTU > 2000) {
    waterState = "Agua contaminada";
  }
 
  // Control del relé basado en NTU
  if (NTU > 2000) {
    digitalWrite(relay1, LOW);  // Enciende el relé
  } else {
    digitalWrite(relay1, HIGH); // Apaga el relé
  }

  // Obtener el estado del relé
  String relayState = digitalRead(relay1) == LOW ? "on" : "off";

  // Crear el JSON
  StaticJsonDocument<200> doc;
  doc["voltage"] = voltage;
  doc["ntu"] = NTU;
  doc["state"] = waterState;
  doc["relay"] = relayState;

  char buffer[256];
  size_t n = serializeJson(doc, buffer);

  // Publicar en el tópico "/data/sensor"
  if (client.publish("data/sensor", buffer, n)) {
    Serial.println("Publicación exitosa en /data/sensor");
  } else {
    Serial.println("Falló la publicación en /data/sensor");
  }

  // Publicar en el tópico "/data/relee"
  if (client.publish("/data/relee", relayState.c_str())) {
    Serial.println("Publicación exitosa en /data/relee");
  } else {
    Serial.println("Falló la publicación en /data/relee");
  }

  // Imprimir en el monitor serie
  Serial.print("Voltage: ");
  Serial.print(voltage);
  Serial.print("V, NTU: ");
  Serial.print(NTU);
  Serial.print(", Estado: ");
  Serial.println(waterState);

  // Enviar datos a través de Bluetooth
  SerialBT.print(voltage);
  SerialBT.print(",");
  SerialBT.print(NTU);
  SerialBT.print(",");
  SerialBT.print(waterState);
  SerialBT.print(",");
  SerialBT.println(relayState);
}

void processIncomingMessage() {
  if (!receivingSSID) { // Si estamos esperando el SSID
    incomingSSID = incomingMessage; // Guarda el SSID
    Serial.print("Nuevo SSID recibido: ");
    Serial.println(incomingSSID);
    receivingSSID = true;
  } else if (receivingSSID && !receivingPassword) { // Si estamos esperando la contraseña
    incomingPassword = incomingMessage; // Guarda la contraseña
    Serial.print("Nueva contraseña recibida: ");
    Serial.println(incomingPassword);
    receivingPassword = true;
    updateWiFiCredentials(); // Actualiza las credenciales Wi-Fi y reconecta
  }
}

void updateWiFiCredentials() {
  ssid = incomingSSID;
  password = incomingPassword;
  connectToWiFi();
  receivingSSID = false;    // Restablece los indicadores
  receivingPassword = false;
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Publicar datos cada 10 segundos
  static unsigned long lastPublish = 0;
  if (millis() - lastPublish > 10000) {
    lastPublish = millis();
    publishData();
  }

  // Lectura de datos del Bluetooth
  while (SerialBT.available()) {  // Mientras hay datos disponibles para leer del Bluetooth
    char inChar = (char)SerialBT.read(); // Lee un carácter del Bluetooth
    if (inChar == '\n') {  // Si el carácter es una nueva línea
      incomingMessage.trim(); // Elimina espacios en blanco al principio y al final
      processIncomingMessage(); // Procesa el mensaje recibido
      incomingMessage = ""; // Limpia el mensaje después de procesarlo
    } else {
      incomingMessage += inChar; // Agrega el carácter a la cadena de mensaje
    }
  }

  // Procesa los comandos de encendido/apagado del relé
  if (incomingMessage == "on") {       // Si el mensaje es "on"
    digitalWrite(relay1, LOW);         // Enciende el relé
    Serial.println("Relé encendido");  // Mensaje de depuración
    incomingMessage = "";              // Limpia el mensaje después de procesarlo
  } else if (incomingMessage == "off") { // Si el mensaje es "off"
    digitalWrite(relay1, HIGH);        // Apaga el relé
    Serial.println("Relé apagado");    // Mensaje de depuración
    incomingMessage = "";              // Limpia el mensaje después de procesarlo
  }
  // Evitar el uso de delay largo
  delay(100);  // Breve pausa para no sobrecargar el procesador
}
