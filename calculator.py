def add(a, b):
    """Сложение двух чисел"""
    return a + b

def subtract(a, b):
    """Вычитание двух чисел"""
    return a - b

def multiply(a, b):
    """Умножение двух чисел"""
    return a * b

def divide(a, b):
    """Деление двух чисел"""
    if b == 0:
        raise ValueError("Нельзя делить на ноль!")
    return a / b

if __name__ == "__main__":
    # Тестирование функций
    print("Сложение:", add(5, 3))
    print("Вычитание:", subtract(5, 3))
    print("Умножение:", multiply(5, 3))
    print("Деление:", divide(6, 3))