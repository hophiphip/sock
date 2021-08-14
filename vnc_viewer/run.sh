#!/bin/sh

x11vnc -create -forever & 
novnc_server --vnc 127.0.0.1:5900
