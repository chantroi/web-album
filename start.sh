#!/bin/bash

python -m daphne -b $(IP:-::) -p $(PORT:-8080) -w 4 main:app