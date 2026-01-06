// Link -- https://www.geeksforgeeks.org/problems/bubble-sort/1

/*
class Solution {
  public:
    void bubbleSort(vector<int>& arr) {
        // code here
        int n = arr.size();
        for(int i=0;i<n-1;i++){
            bool swapped = false;
            for(int j=0;j<n-i-1;j++){
                if(arr[j]>arr[j+1]){
                    swap(arr[j],arr[j+1]);
                    swapped = true;
                }
            }
            if(!swapped){
                break;
            }
        }
    }
};*/