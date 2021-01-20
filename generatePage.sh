#!/bin/bash

echo "Genrate page $1 ..."

#ng g component pages/$1 --skip-import --prefix=app | ng g module pages/$1 --routing
ng g module pages/$1 | ng g component pages/$1 --skip-import --prefix=app --module=pages/$1.module.ts