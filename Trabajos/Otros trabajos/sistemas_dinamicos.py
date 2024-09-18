# -*- coding: utf-8 -*-
"""Sistemas dinamicos.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/11La7RL5AIqy8D8IWq01tT7nST8G2-zTt
"""

import math
import time
import cmath
import matplotlib.pyplot as plt
import numpy as np

def determinante(x1, y1, x2, y2):
    resultado = (x1 * y2) - (x2 * y1)
    return resultado

def form_gen1(a, b, c):
    p = (b ** 2)
    resultado = p - 4 * a * c
    if resultado >= 0:
        x1 = (-b + math.sqrt(resultado)) / (2 * a)
    else:
        x1 = (-b + cmath.sqrt(resultado)) / (2 * a)
    return x1

def form_gen2(a, b, c):
    p2 = (b ** 2)
    resultado2 = p2 - 4 * a * c
    if resultado2 >= 0:
        x2 = (-b - math.sqrt(resultado2)) / (2 * a)
    else:
        x2 = (-b - cmath.sqrt(resultado2)) / (2 * a)
    return x2

a1, b1, a2, b2 = 0, 0, 0, 0
deter, suma, suma2 = 0, 0, 0
l1, l2, l3, l4, pr1,pr2 = 0, 0, 0, 0, 0, 0

# Interfaz del usuario
print("Bienvenido querido usuario")
print()
print("Este programa está hecho para resolver ecuaciones lineales de la forma")
print()
print("X' = a1x + b1y")
print("Y' = a2x + b2y")
print()
print("Se desea hallar el tipo y estabilidad del punto crítico (0,0)")
print()
print()

# Registrar los valores
a1 = int(input("Ingresa un valor para a1: "))
b1 = int(input("Ingresa un valor para b1: "))
a2 = int(input("Ingresa un valor para a2: "))
b2 = int(input("Ingresa un valor para b2: "))
print()

# Jugando un poco con los condicionales para mostrar la ecuación completa con sus datos
if b1 < 0:
    print(f"X' = {a1}x {b1}y")
    if b2 < 0:
        print(f"X' = {a2}x {b2}y")
    else:
        print(f"Y' = {a2}x + {b2}y")
else:
    print(f"X' = {a1}x + {b1}y")
    if b2 < 0:
        print(f"X' = {a2}x {b2}y")
    else:
        print(f"Y' = {a2}x + {b2}y")

# Mostrar la matriz con los datos de los coeficientes
print("          _          _")
print(f"         |{a1}        {b1}|")
print("         |           |")
print("   A =   |           |")
print(f"         |{a2}        {b2}|")
print("         -          -")
print()

deter = determinante(a1, b1, a2, b2)
suma = a1 + b2
suma2 = suma

# Estos condicionales sirven para mostrar un mensaje cuando el punto crítico no es único y cerrar el programa
# En caso contrario, mostrará el determinante y la ecuación dada
if deter == 0:
    print("Calculando el determinante, espere")
    time.sleep(2)
    print("Lo siento, el punto crítico (0,0) de la ecuación no es único")
else:
    print("Calculando el determinante, espere")
    time.sleep(2)
    print(f"El determinante del punto crítico es: {deter}")
    print("el punto crítico (0,0) de la ecuación es unico")
    if deter < 0:
        if suma > 0:
            suma = -(a1 + b2)
            print(f"El P(l) = l^2{suma}l{deter}")
        else:
            suma = -(a1 + b2)
            print(f"El P(l) = l^2+{suma}l{deter}")
    else:
        if suma > 0:
            suma = -(a1 + b2)
            print(f"El P(l) = l^2{suma}l+{deter}")
        else:
            suma = -(a1 + b2)
            print(f"El P(l) = l^2+{suma}l+{deter}")
    print()

    # Esta parte de aquí sirve para hallar los autovalores de l1 como de l2
    print("Hallando los valores de l1 y l2")
    time.sleep(2)
    pr1 =form_gen2(1, suma, deter)
    pr2 =form_gen1(1, suma, deter)
    if isinstance(pr1, complex) and isinstance(pr2, complex):
      print(f"l1 = {form_gen2(1, suma, deter)}")
      print(f"l2 = {form_gen1(1, suma, deter)}")
      l3 = form_gen2(1, suma, deter)
      l4 = form_gen1(1, suma, deter)
    else:
      print(f"l1 = {form_gen2(1, suma, deter)}")
      print(f"l2 = {form_gen1(1, suma, deter)}")
      l1 = form_gen2(1, suma, deter)
      l2 = form_gen1(1, suma, deter)


# Condicionales para tipo y estabilidad de un punto crítico
if ((l1 > 0 and l2 > 0) or (l1 < 0 and l2 < 0)):
    print("El punto crítico (0,0) es un nodo")
    if suma2 == 0:
        print("El punto crítico (0,0) es estable")
        x = np.linspace(-2, 2, 20)
        y = np.linspace(-2, 2, 20)
        X, Y = np.meshgrid(x, y)
        dx = a1 * X + b1 * Y
        dy = a2 * X + b2 * Y

        plt.quiver(X, Y, dx, dy, scale=20)
        plt.xlabel('x')
        plt.ylabel('y')
        plt.title('Retrato de Fase del Nodo Estable')
        plt.grid()
        plt.gca().spines['left'].set_position('zero')
        plt.gca().spines['left'].set_color('gray')
        plt.gca().spines['left'].set_linewidth(0.5)
        plt.gca().spines['bottom'].set_position('zero')
        plt.gca().spines['bottom'].set_color('gray')
        plt.gca().spines['bottom'].set_linewidth(0.5)
        plt.gca().spines['right'].set_color('none')
        plt.gca().spines['top'].set_color('none')
        plt.xlim(-2, 2)
        plt.ylim(-2, 2)
        plt.gca().set_aspect('equal')
        plt.show()
    elif suma2 > 0:
        print("El punto crítico (0,0) es inestable")
        x = np.linspace(-2, 2, 20)
        y = np.linspace(-2, 2, 20)
        X, Y = np.meshgrid(x, y)
        dx = a1 * X + b1 * Y
        dy = a2 * X + b2 * Y

        plt.quiver(X, Y, dx, dy, scale=20)
        plt.xlabel('x')
        plt.ylabel('y')
        plt.title('Retrato de Fase del Nodo Inestable')
        plt.grid()
        plt.gca().spines['left'].set_position('zero')
        plt.gca().spines['left'].set_color('gray')
        plt.gca().spines['left'].set_linewidth(0.5)
        plt.gca().spines['bottom'].set_position('zero')
        plt.gca().spines['bottom'].set_color('gray')
        plt.gca().spines['bottom'].set_linewidth(0.5)
        plt.gca().spines['right'].set_color('none')
        plt.gca().spines['top'].set_color('none')
        plt.xlim(-2, 2)
        plt.ylim(-2, 2)
        plt.gca().set_aspect('equal')
        plt.show()
    elif suma2 < 0:
        print("El punto crítico (0,0) es asintóticamente estable")
        x = np.linspace(-2, 2, 20)
        y = np.linspace(-2, 2, 20)
        X, Y = np.meshgrid(x, y)
        dx = a1 * X + b1 * Y
        dy = a2 * X + b2 * Y

        plt.quiver(X, Y, dx, dy, scale=20)
        plt.xlabel('x')
        plt.ylabel('y')
        plt.title('Retrato de Fase del Nodo Asintóticamente Estable')
        plt.grid()
        plt.gca().spines['left'].set_position('zero')
        plt.gca().spines['left'].set_color('gray')
        plt.gca().spines['left'].set_linewidth(0.5)
        plt.gca().spines['bottom'].set_position('zero')
        plt.gca().spines['bottom'].set_color('gray')
        plt.gca().spines['bottom'].set_linewidth(0.5)
        plt.gca().spines['right'].set_color('none')
        plt.gca().spines['top'].set_color('none')
        plt.xlim(-2, 2)
        plt.ylim(-2, 2)
        plt.gca().set_aspect('equal')
        plt.show()
elif l1 != l2 and ((l1 > 0 and l2 < 0) or (l1 < 0 and l2 > 0)):
    print("El punto crítico (0,0) es un silla")
    print("El punto crítico (0,0) es inestable")
    x = np.linspace(-2, 2, 20)
    y = np.linspace(-2, 2, 20)
    X, Y = np.meshgrid(x, y)
    dx = a1 * X + b1 * Y
    dy = a2 * X + b2 * Y

    plt.quiver(X, Y, dx, dy, scale=20)
    plt.xlabel('x')
    plt.ylabel('y')
    plt.title('Retrato de Fase de Silla Inestable')
    plt.grid()
    plt.gca().spines['left'].set_position('zero')
    plt.gca().spines['left'].set_color('gray')
    plt.gca().spines['left'].set_linewidth(0.5)
    plt.gca().spines['bottom'].set_position('zero')
    plt.gca().spines['bottom'].set_color('gray')
    plt.gca().spines['bottom'].set_linewidth(0.5)
    plt.gca().spines['right'].set_color('none')
    plt.gca().spines['top'].set_color('none')
    plt.xlim(-2, 2)
    plt.ylim(-2, 2)
    plt.gca().set_aspect('equal')
    plt.show()

elif (l1 == l2) and ((l1 > 0 and l2 < 0) or (l1 < 0 and l2 > 0)):
    print("El punto crítico (0,0) es un nodo")
    if suma2 == 0:
        print("El punto crítico (0,0) es estable")
        x = np.linspace(-2, 2, 20)
        y = np.linspace(-2, 2, 20)
        X, Y = np.meshgrid(x, y)
        dx = a1 * X + b1 * Y
        dy = a2 * X + b2 * Y

        plt.quiver(X, Y, dx, dy, scale=20)
        plt.xlabel('x')
        plt.ylabel('y')
        plt.title('Retrato de Fase del Nodo Estable')
        plt.grid()
        plt.gca().spines['left'].set_position('zero')
        plt.gca().spines['left'].set_color('gray')
        plt.gca().spines['left'].set_linewidth(0.5)
        plt.gca().spines['bottom'].set_position('zero')
        plt.gca().spines['bottom'].set_color('gray')
        plt.gca().spines['bottom'].set_linewidth(0.5)
        plt.gca().spines['right'].set_color('none')
        plt.gca().spines['top'].set_color('none')
        plt.xlim(-2, 2)
        plt.ylim(-2, 2)
        plt.gca().set_aspect('equal')
        plt.show()
    elif suma2 > 0:
        print("El punto crítico (0,0) es inestable")
        x = np.linspace(-2, 2, 20)
        y = np.linspace(-2, 2, 20)
        X, Y = np.meshgrid(x, y)
        dx = a1 * X + b1 * Y
        dy = a2 * X + b2 * Y

        plt.quiver(X, Y, dx, dy, scale=20)
        plt.xlabel('x')
        plt.ylabel('y')
        plt.title('Retrato de Fase del Nodo Inestable')
        plt.grid()
        plt.gca().spines['left'].set_position('zero')
        plt.gca().spines['left'].set_color('gray')
        plt.gca().spines['left'].set_linewidth(0.5)
        plt.gca().spines['bottom'].set_position('zero')
        plt.gca().spines['bottom'].set_color('gray')
        plt.gca().spines['bottom'].set_linewidth(0.5)
        plt.gca().spines['right'].set_color('none')
        plt.gca().spines['top'].set_color('none')
        plt.xlim(-2, 2)
        plt.ylim(-2, 2)
        plt.gca().set_aspect('equal')
        plt.show()
    elif suma2 < 0:
        print("El punto crítico (0,0) es asintóticamente estable")
        x = np.linspace(-2, 2, 20)
        y = np.linspace(-2, 2, 20)
        X, Y = np.meshgrid(x, y)
        dx = a1 * X + b1 * Y
        dy = a2 * X + b2 * Y

        plt.quiver(X, Y, dx, dy, scale=20)
        plt.xlabel('x')
        plt.ylabel('y')
        plt.title('Retrato de Fase del Nodo Asintóticamente Estable')
        plt.grid()
        plt.gca().spines['left'].set_position('zero')
        plt.gca().spines['left'].set_color('gray')
        plt.gca().spines['left'].set_linewidth(0.5)
        plt.gca().spines['bottom'].set_position('zero')
        plt.gca().spines['bottom'].set_color('gray')
        plt.gca().spines['bottom'].set_linewidth(0.5)
        plt.gca().spines['right'].set_color('none')
        plt.gca().spines['top'].set_color('none')
        plt.xlim(-2, 2)
        plt.ylim(-2, 2)
        plt.gca().set_aspect('equal')
        plt.show()
if (l3.imag != 0 or l4.imag != 0) and l3.imag == -l4.imag and l3.real == l4.real == 0:
    print("El punto crítico (0,0) es un centro")
    print("El punto crítico (0,0) es estable")
    x = np.linspace(-2, 2, 20)
    y = np.linspace(-2, 2, 20)
    X, Y = np.meshgrid(x, y)
    dx = a1 * X + b1 * Y
    dy = a2 * X + b2 * Y

    plt.quiver(X, Y, dx, dy, scale=20)
    plt.xlabel('x')
    plt.ylabel('y')
    plt.title('Retrato de Fase de Centro Estable')
    plt.grid()
    plt.gca().spines['left'].set_position('zero')
    plt.gca().spines['left'].set_color('gray')
    plt.gca().spines['left'].set_linewidth(0.5)
    plt.gca().spines['bottom'].set_position('zero')
    plt.gca().spines['bottom'].set_color('gray')
    plt.gca().spines['bottom'].set_linewidth(0.5)
    plt.gca().spines['right'].set_color('none')
    plt.gca().spines['top'].set_color('none')
    plt.xlim(-2, 2)
    plt.ylim(-2, 2)
    plt.gca().set_aspect('equal')
    plt.show()
elif (l3.imag != 0) or (l4.imag != 0) or (l3.real != 0) or (l4.real != 0):
    print("El punto crítico (0,0) es un foco o espiral")
    if suma2 == 0:
        print("El punto crítico (0,0) es estable")
        x = np.linspace(-2, 2, 20)
        y = np.linspace(-2, 2, 20)
        X, Y = np.meshgrid(x, y)
        dx = a1 * X + b1 * Y
        dy = a2 * X + b2 * Y

        plt.quiver(X, Y, dx, dy, scale=20)
        plt.xlabel('x')
        plt.ylabel('y')
        plt.title('Retrato de Fase de Foco o Espiral Estable')
        plt.grid()
        plt.gca().spines['left'].set_position('zero')
        plt.gca().spines['left'].set_color('gray')
        plt.gca().spines['left'].set_linewidth(0.5)
        plt.gca().spines['bottom'].set_position('zero')
        plt.gca().spines['bottom'].set_color('gray')
        plt.gca().spines['bottom'].set_linewidth(0.5)
        plt.gca().spines['right'].set_color('none')
        plt.gca().spines['top'].set_color('none')
        plt.xlim(-2, 2)
        plt.ylim(-2, 2)
        plt.gca().set_aspect('equal')
        plt.show()
    elif suma2 > 0:
        print("El punto crítico (0,0) es inestable")
        x = np.linspace(-2, 2, 20)
        y = np.linspace(-2, 2, 20)
        X, Y = np.meshgrid(x, y)
        dx = a1 * X + b1 * Y
        dy = a2 * X + b2 * Y

        plt.quiver(X, Y, dx, dy, scale=20)
        plt.xlabel('x')
        plt.ylabel('y')
        plt.title('Retrato de Fase de Foco o Espiral Inestable')
        plt.grid()
        plt.gca().spines['left'].set_position('zero')
        plt.gca().spines['left'].set_color('gray')
        plt.gca().spines['left'].set_linewidth(0.5)
        plt.gca().spines['bottom'].set_position('zero')
        plt.gca().spines['bottom'].set_color('gray')
        plt.gca().spines['bottom'].set_linewidth(0.5)
        plt.gca().spines['right'].set_color('none')
        plt.gca().spines['top'].set_color('none')
        plt.xlim(-2, 2)
        plt.ylim(-2, 2)
        plt.gca().set_aspect('equal')
        plt.show()
    elif suma2 < 0:
        print("El punto crítico (0,0) es asintóticamente estable")
        x = np.linspace(-2, 2, 20)
        y = np.linspace(-2, 2, 20)
        X, Y = np.meshgrid(x, y)
        dx = a1 * X + b1 * Y
        dy = a2 * X + b2 * Y

        plt.quiver(X, Y, dx, dy, scale=20)
        plt.xlabel('x')
        plt.ylabel('y')
        plt.title('Retrato de Fase de Foco o Espiral Asintóticamente Estable')
        plt.grid()
        plt.gca().spines['left'].set_position('zero')
        plt.gca().spines['left'].set_color('gray')
        plt.gca().spines['left'].set_linewidth(0.5)
        plt.gca().spines['bottom'].set_position('zero')
        plt.gca().spines['bottom'].set_color('gray')
        plt.gca().spines['bottom'].set_linewidth(0.5)
        plt.gca().spines['right'].set_color('none')
        plt.gca().spines['top'].set_color('none')
        plt.xlim(-2, 2)
        plt.ylim(-2, 2)
        plt.gca().set_aspect('equal')
        plt.show()