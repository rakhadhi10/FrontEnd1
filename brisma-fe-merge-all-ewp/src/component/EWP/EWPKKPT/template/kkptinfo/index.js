


export const getHtmlKkptInfo = (data) => {
    let temuan_berulang = data.is_temuan_berulang ? "Temuan Berulang" : "Tidak Temuan Berulang"

    return `
    <p style="margin-bottom: 20px;"><strong>KKPT INFO</strong></p>

    <div style="display: flex;margin-bottom:10px;">
        <div style="width: 100px;">Judul KKPT</div>
        <div style="padding-left: 10px;">:</div>
        <div style="padding-left: 10px;">${data.judul_kkpt}</div>
    </div>
    <div style="display: flex;margin-bottom:10px;">
        <div style="width: 100px;">Jenis Temuan</div>
        <div style="padding-left: 10px;">:</div>
        <div style="padding-left: 10px;">${temuan_berulang}</div>
    </div>
    <div style="display: flex;margin-bottom:10px;">
        <div style="width: 100px;">Tipe Resiko</div>
        <div style="padding-left: 10px;">:</div>
        <div style="padding-left: 10px;">${data.mtd_stc_risk_type_name !== null ? data.mtd_stc_risk_type_name : ""}</div>
    </div>
    <div style="display: flex;margin-bottom:10px;">
        <div style="width: 100px;">Focus Audit</div>
        <div style="padding-left: 10px;">:</div>
        <div style="padding-left: 10px;">${data.audit_focus_name !== null ? data.audit_focus_name : ""}</div>
    </div>
    <div style="display: flex;margin-bottom:10px;">
        <div style="width: 100px;">Produk</div>
        <div style="padding-left: 10px;">:</div>
        <div style="padding-left: 10px;">
            ${data.products_kode !== null ? data.products_kode.map((v, k) => `<p>${k + 1} ${v}</p>`) : ""}
        </div>
    </div>
    `
}

