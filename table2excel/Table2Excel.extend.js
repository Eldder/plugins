Table2Excel.extend((cell, cellText) => {
    console.log(cell.className)
    if ((cell.className + "").indexOf("excel-ignore") > -1) {
        return null;
    }
    if (cell.firstElementChild) {
        if ('number' == cell.firstElementChild.type) {
            return { t: 'n', v: $(cell.firstElementChild).val(), s: { alignment: { wrapText: true } } };
        }
    }
    if ('' == cell.className) {
        return { t: 's', v: cellText, s: { alignment: { horizontal: "center" } } };
    }
    if (cellText.length > 0 && !isNaN(cellText)) {
        if ((cell.className + "").indexOf("success") > -1) {
            return { t: 's', v: cellText, s: { alignment: { wrapText: true }, fill: { fgColor: { rgb: "dff0d8" } } } };
        }
        if ((cell.className + "").indexOf("danger") > -1) {
            return { t: 's', v: cellText, s: { alignment: { wrapText: true }, fill: { fgColor: { rgb: "f2dede" } } } };
        }
        if ((cell.className + "").indexOf("warning") > -1) {
            return { t: 's', v: cellText, s: { alignment: { wrapText: true }, fill: { fgColor: { rgb: "ffc107" } } } };
        }
        return { t: 's', v: cellText, s: { alignment: { wrapText: true } } };
    }

    return null;
});