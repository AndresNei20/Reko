import pandas as pd

# Función para cargar los datasets
def load_datasets():
    # Cargar los datasets
    data1 = pd.read_csv("datasets/dataNetflix.csv")
    data2 = pd.read_csv("datasets/dataPrime.csv")
    data3 = pd.read_csv("datasets/dataHbo.csv")
    return data1, data2, data3

# Prueba rápida para ver los datos
if __name__ == "__main__":
    data1, data2, data3 = load_datasets()
    
    # Muestra las primeras filas de cada dataset para verificar
    print("Dataset 1:")
    print(data1.head())
    print("\nDataset 2:")
    print(data2.head())
    print("\nDataset 3:")
    print(data3.head())