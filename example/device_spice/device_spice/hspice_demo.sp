* HSPICE demo

.LIB /Users/me/Workspace/node-ngspice/example/device_spice/device_spice/cmos25.lib TT
.tran 1ns 1000ns
.print v(*)

V1 vin 0 sin(0v 2.5v 100)

M1 vout vin 0 0 nmos W=0.25u L=0.25u
M2 vout vin VDD VDD pmos W=0.5u L=0.25u

.end
