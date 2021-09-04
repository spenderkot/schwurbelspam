#!/bin/bash

for i in {1..9001}
do
   node spam.js
   echo $i
done