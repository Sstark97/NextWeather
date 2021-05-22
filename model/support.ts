export const dateFormatter = (today:string) : string => {
    var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
    var dt = new Date(today.replace(pattern,'$3-$2-$1')).toString().substring(0,11);
    return dt;
}
