// https://www.geeksforgeeks.org/problems/majority-element-1587115620/1

//Solution

/*

class Solution {
  public:
    int majorityElement(vector<int>& arr) {
        // code here
        
        int n = arr.size();
        int majority = 0;
        int el;
        
        for(int i=0;i<n;i++){
            if(majority == 0){
                el = arr[i];
                majority =1 ;
            }
            else if(arr[i] == el){
                majority++;
            }
            else{
                majority--;
            }
        }
        
        int count = 0;
        for(int i = 0; i<n ;i++){
            if(arr[i] == el) count ++;
        }
        
        if(count>(arr.size()/2)){
        return el;
        }
        else{
            return -1;
        }
    }
};

*/