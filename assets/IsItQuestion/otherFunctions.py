def percentageDiff(num1, num2):
    if num1 == num2:
        return 100.0
    try:
        return (abs(num1 - num2) / num2) * 100.0
    except ZeroDivisionError:
        if num1 > 50:
            return 100.0
        else:
            return 0 