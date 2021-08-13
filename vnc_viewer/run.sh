#!/bin/bash

x11vnc -create -forever & 
./utils/novnc_proxy --vnc 127.0.0.1:5900
