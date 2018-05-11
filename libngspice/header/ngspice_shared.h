/* This file is modified from sharedspice.h */
/* first written by Holger Vogt */

/* header file for shared ngspice */
/* Copyright 2013 Holger Vogt */
/* Modified BSD license */

struct ngcomplex {
    double cx_real;
    double cx_imag;
} ;

typedef struct ngcomplex ngcomplex_t;

typedef struct vector_info {
    char *v_name;
    int v_type;
    short v_flags;
    double *v_realdata;
    ngcomplex_t *v_compdata;
    int v_length;
} vector_info, *pvector_info;

typedef struct vecvalues {
    char* name;
    double creal;
    double cimag;
    bool is_scale;
    bool is_complex;
} vecvalues, *pvecvalues;

typedef struct vecvaluesall {
    int veccount;
    int vecindex;
    pvecvalues *vecsa;
} vecvaluesall, *pvecvaluesall;

typedef struct vecinfo
{
    int number;
    char *vecname;
    bool is_real;
    void *pdvec;
    void *pdvecscale;
} vecinfo, *pvecinfo;

typedef struct vecinfoall
{
    /* the plot */
    char *name;
    char *title;
    char *date;
    char *type;
    int veccount;
    pvecinfo *vecs;

} vecinfoall, *pvecinfoall;
typedef int (SendChar)(char*, int, void*);
typedef int (SendStat)(char*, int, void*);
typedef int (ControlledExit)(int, bool, bool, int, void*);
typedef int (SendData)(pvecvaluesall, int, int, void*);
typedef int (SendInitData)(pvecinfoall, int, void*);
typedef int (BGThreadRunning)(bool, int, void*);
typedef int (GetVSRCData)(double*, double, char*, int, void*);
typedef int (GetISRCData)(double*, double, char*, int, void*);
typedef int (GetSyncData)(double, double*, double, int, int, int, void*);

int  ngSpice_Init(SendChar* printfcn, SendStat* statfcn, ControlledExit* ngexit,
                  SendData* sdata, SendInitData* sinitdata, BGThreadRunning* bgtrun, void* userData);

int  ngSpice_Init_Sync(GetVSRCData* vsrcdat, GetISRCData* isrcdat, GetSyncData* syncdat, int* ident, void* userData);

int  ngSpice_Command(char* command);
pvector_info ngGet_Vec_Info(char* vecname);
int ngSpice_Circ(char** circarray);
char* ngSpice_CurPlot(void);
char** ngSpice_AllPlots(void);
char** ngSpice_AllVecs(char* plotname);
bool ngSpice_running(void);
bool ngSpice_SetBkpt(double time);
