export const formatDate = (date: Date) => {
    const yyyy = date.getFullYear();
    let mm: any = date.getMonth()+1;
    let dd: any = date.getDate();

    if(dd < 10) dd = '0' + dd.toString();
    if(mm < 10) mm = '0' + mm.toString();

    return `${dd}/${mm}/${yyyy}`
}