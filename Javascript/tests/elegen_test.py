import csv 

# Use certain coumns in file 1 
# store it in file 2

# extract column name and sequence from imput file
# store the columns name , sequence and Quant in output file 

def read_column_from_csv(file_path, column_name1, column_name2):
    with open(file_path, mode='r') as file:
        csv_reader = csv.DictReader(file)
        column_data1 = [row[column_name1] for row in csv_reader]
        column_data2 = [row[column_name2] for row in csv_reader]
    return column_data1, c


read_column_from_csv( "C:\\Users\\akram\\Downloads\\EB2-input(1).csv","name","sequence")
