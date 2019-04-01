# What about data structures?
This repository contains basic implementations of common data structures, for learning purpose. The idea here is to have a practical approach to data structure and complexity

The data structure are implemented in Javascript. Of course, Javascript being a high-level language, it already provides complex data structures out of the box (e.g., dynamic and associative arrays).  
The point here being to reimplement such data structure, we will take the following assumptions:

- we will consider arrays as fixed-size arrays (i.e., a fixed-size sequence of contiguous elements in memory).
- we will consider associative arrays as fixed-size data structures.


# A word about complexity: Big O, Big Ω and Big θ
Invented by Paul Bachmann and Edmund Landau, Big O, Big Ω and Big θ notations (called *asymptotic notations*) describe how an algorithm scales in relation on its input size. 

They can be used to describe different type of complexity:
- time complexity (runtime)
- space complexity (memory they consume)

The idea behin these notations is to describe *boundaries* of the complexity. In a nutshell, if we have a function f that can describe how our algorithm behave when n becomes very large:
- Big O expresses the *upper boundary* of f (worst case)
- Big Ω expresses the *lower boundary* of f (best case)
- Big θ expresses the *exact boundary* of f, if any. 
In practice, many people use Big O notation as a synonym of Big θ. We will tend to do that too in our examples. 

At scale, constants and coefficients doesn't matter much, for example, we can say that n+5 or 2n is in O(n), because the dominant value is n. Similarly, we can say that n²+n is in O(n²), given that the dominant value is n². This notion of "dominant value" is formalized in the next section.

## Formal definitions
Big O, Big Ω and Big θ are defined formally as follow:

- Big O: the worst case boundary
```
f(n) is in O(g(n)) as n → ∞
iff f(n) ≤ k·g(n) for all n ≥ n₀
```

In plain english: the complexity, noted f(n), belong to the class Big O of g(n) iff there exists some positive constant k such that, after some value of n (n₀), g(n) will always be greater than f(n). For this reason 2n is O(n): there exists an k (all k ≥ 3) such as 2n ≤ k·n.

- Big Ω: the best case boundary
```
f(n) is in Ω(g(n)) as n → ∞
iff f(n) ≥ k·g(n) for all n ≥ n₀
```

This is the inverse of Big O: the complexity, noted f(n), belong to the class Big Ω of g(n) iff there exists some positive constant k such that, after some value of n (n₀), g(n) will always be lesser than f(n).

- Big θ: the exact boundary
```
f(n) is in θ(g(n)) as n → ∞
iff k₁·g(n) ≤ f(n) ≤ k₂·g(n) for all n ≥ n₀
```

This is both Big O and Big Ω: the complexity, noted f(n), belong to the class Big θ of g(n) when f(n) is in O(g(n)) and f(n) is in Ω(g(n)).



## Common order functions
Here are a few examples of complexity function, in the case of runtime:
- read an array element is constant time, noted O(1), given that reading one element in an array does not depends on the size of the array

```
const arr = [1, 2, 3, 4, 5];
arr[0];
```

- a single for-loop, e.g., printing all elements of an array, is linear time, noted O(n). For each element of the array we have a constant set of operations.

```
const arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

- a nested for-loop is quadratic time, noted O(n²). For each element of the array, we have a constant set of operations repeated n times (hence n * n).

```
const arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    console.log(arr[i], arr[j]);
  }
}
```

- O(n³), O(n⁴) and so on...

- you can have various other classes: O(log(n)) (logarithmic), O(cⁿ) (exponential) with c a constant, O(n!) (factorial), O(nlog(n)), etc.
