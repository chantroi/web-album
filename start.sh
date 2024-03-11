#!/bin/bash

daphne -b 0.0.0.0 -p $(PORT:-8080) -w 4 main:app