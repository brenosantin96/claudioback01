export const formatCurrentMonth = (currentMonth: string): string => {

    let [year, month] = currentMonth.split('-');
    let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${months[parseInt(month) - 1]} ${year}`

}

export const isValidDate = (d: Date): boolean => {
    if (d instanceof Date && !isNaN(d.getTime())) {
        return true
    } else {
        return false
    }
}

