const nums: number[] = [];

// write //
nums[0] = 1;
nums[1] = 2;
nums[2] = 3;

nums.push(4);
nums.push(5);

nums.unshift(0);
nums.unshift(-1);

console.log(nums);

// delete //
nums.splice(4, 1);
console.log(nums);

const binarySearch = (
  arr: number[],
  target: number,
  start: number = 0,
  end: number = arr.length - 1
): boolean => {
  // base case //
  if (start > end) return false;

  const mid = Math.floor((start + end) / 2);

  // found //
  if (arr[mid] === target) {
    return true;
  }

  // search left half //
  if (target < arr[mid]) {
    return binarySearch(arr, target, start, mid - 1);
  }

  // search right half //
  return binarySearch(arr, target, mid + 1, end);
};

const arr = [1, 2, 3, 4, 5, 6];
console.log(binarySearch(arr, 5));
console.log(binarySearch(arr, 10));
console.log(binarySearch(arr, 3));
