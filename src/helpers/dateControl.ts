export const formatCurrentMonth = (currentMonth: string): string => {

    let [year, month] = currentMonth.split('-');
    let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${months[parseInt(month) - 1]} ${year}`

}

export const isValidDate = (d: any): boolean => {
    return d instanceof Date && !isNaN(d as any);
}


//return d instanceof Date && !isNaN(d);