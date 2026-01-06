// Link https://www.geeksforgeeks.org/problems/selection-sort/1
/*
class Solution {
  public:
    // Function to perform selection sort on the given array.
    void selectionSort(vector<int> &arr) {
        // code here
        int n = arr.size();
        for(int i = 0;i<n;i++){
            int min_index = i;
            for(int j = i+1;j<n;j++){
                if(arr[j]<arr[min_index]){
                    min_index = j;
                }
            }
        swap(arr[i],arr[min_index]);
        }
    }
}; */