import timeit
from timeit import Timer

### This program will show
# 1) pseudocode for bubble sort, 
# 2) a) the python implementation of the bubble sort algorithm and b) quick sort algorithm.
# 3) the run time for both these algorithms


## 1) Pseudocode for bubble sort (smallest to largest)

# define bubbleSortPassFunction(list): 
    # set a variable to False that tracks any change made
    # For a list take the elements at index n and n+1 where n = 0(the first two)
        # if n is the last element of the list:
            # break loop
        # if element n > element n + 1
            # set the variable change tracker to True
            # Assign element at n to a temporary variable
            # Assign element n + 1 to the list index n
            # Assign the value from the temporary variable to the list index n + 1
        # Go back to the top of this loop but add one to n
    # return the change tracker variable value

#define bubbleSortFunction(list):
    # while bubbleSortPassFunction returns True
        # run bubbleSortPassFunction(list) 



## 2)a) Code for bubble sort (smallest to largest)

def bubbleSortPassFunction(listToSort):
    changes = False
    for (idx, val) in enumerate(listToSort):
        if idx == len(listToSort) - 1:
            break
        if val > listToSort[idx + 1]:
            changes = True
            temp = val
            listToSort[idx] = listToSort[idx + 1]
            listToSort[idx + 1] = temp
    return changes


def bubbleSortFunction(listToSort):
    if len(listToSort) < 2:
        return listToSort
    lastPassNotDone = True   
    while lastPassNotDone:
        lastPassNotDone = bubbleSortPassFunction(listToSort) 
    return listToSort





## 2)b) Code for quick sort (smallest to largest)

def quickSortFunction(listToSort):
    if len(listToSort) < 2:
        return listToSort
    pivot = listToSort.pop(0)
    leftList = []
    rightList = []
    for elem in listToSort:
        if elem < pivot:
            leftList.append(elem)
        else:
            rightList.append(elem)
    return quickSortFunction(leftList) + [pivot] + quickSortFunction(rightList)




## 3) Compare runtimes of the two sort algorithms

# testList = [1,5,1,2,6,8,3,6,4,8,9,6,1,0,7,4,3,7,8,9,5,6,645,2,68,32,12,11,1,2,3,1,5,3,7,7,8,7,5,3,3,2,2,5,55,3,2,5,7,9,1,2,3,54,6,80,7,9,0]

# bubbleSortTestList = testList.copy()
# bubbleResult = bubbleSortFunction(bubbleSortTestList)
# bubbleTime = timeit.repeat(lambda: "bubbleSortFunction([1,5,1,2,6,8,3,6,4,8,9,6,1,0,7,4,3,7,8,9,5,6,645,2,68,32,12,11,1,2,3,1,5,3,7,7,8,7,5,3,3,2,2,5,55,3,2,5,7,9,1,2,3,54,6,80,7,9,0])",  "from __main__ import bubbleSortFunction")

# quickSortTestList = testList.copy()
# quickResult = quickSortFunction(quickSortTestList)
# quickTime = timeit.repeat(lambda: "quickSortFunction([1,5,1,2,6,8,3,6,4,8,9,6,1,0,7,4,3,7,8,9,5,6,645,2,68,32,12,11,1,2,3,1,5,3,7,7,8,7,5,3,3,2,2,5,55,3,2,5,7,9,1,2,3,54,6,80,7,9,0])",  "from __main__ import quickSortFunction",  number=1000000)

# print("Bubble sort result:")
# print(bubbleResult)
# # output: [0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 11, 12, 32, 54, 55, 68, 80, 645]
# print("Bubble sort time:")
# print(bubbleTime)
# # output: [0.0905666, 0.0914517, 0.08016490000000004, 0.0752023, 0.06821760000000004]

# print("\nQuick sort result:")
# print(quickResult)
# # output: [0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 11, 12, 32, 54, 55, 68, 80, 645]
# print("Quick sort time:")
# print(quickTime)
# # output: [0.08716020000000002, 0.10518240000000001, 0.08062750000000007, 0.08036330000000003, 0.09309849999999997]


