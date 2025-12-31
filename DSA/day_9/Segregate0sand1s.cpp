//Link - https://strikes.in/practice/68b3ad974f186b885b9c832f

// Soltion

/*

void segregate0and1(vector<int>& arr) {
    // Your code here
    int n = arr.size();
	vector<int>newarr;
for(int i=0;i<n;i++){
	if(arr[i]==0){
		newarr.push_back(arr[i]);
	}
}
for(int i=0;i<n;i++){
	if(arr[i]==1){
		newarr.push_back(arr[i]);
	}
}

 for(int i=0;i<n;i++){
            arr[i] = newarr[i];
        }

}

*/