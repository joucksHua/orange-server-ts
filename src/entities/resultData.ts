export =(data: any = null, code: number = 200, msg: string = "success"): Object => {
    console.log("结果-----------", data, code, msg)
    return { code, msg, data };
}