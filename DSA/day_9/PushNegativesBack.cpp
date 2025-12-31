// Link - https://strikes.in/practice/68aeaea0ef02c46ee92ec3e5

// Solution 1
/*

vector<int> moveNegativesToEnd(vector<int>& arr) {
    // Your code here

	int n = arr.size();
	vector<int>positive;
	vector<int>negative;
	vector<int>output;

	for(int i=0;i<n;i++){
		if(arr[i]>= 0){
			positive.push_back(arr[i]);
		}
		else{
			negative.push_back(arr[i]);
		}
	}
	for(int i=0;i<positive.size();i++){
		output.push_back(positive[i]);
	}
	for(int i=0;i<negative.size();i++){
		output.push_back(negative[i]);
	}
	
	return output;

}

*/

// Question 2
// https://www.geeksforgeeks.org/problems/move-all-negative-elements-to-end1813/1

// Solution

/*

class Solution {
  public:
    void segregateElements(vector<int>& arr) {
        // Your code goes here
        int n = arr.size();
        vector<int>temp;
        for(int i=0;i<n;i++){
            if(arr[i]>=0){
                temp.push_back(arr[i]);
            }
        }
        for(int i=0;i<n;i++){
            if(arr[i]<0){
                temp.push_back(arr[i]);
            }
        }
        for(int i=0;i<n;i++){
            arr[i] = temp[i];
        }
    }
};

*/