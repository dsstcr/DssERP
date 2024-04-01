frappe.ui.form.on("Purchase Invoice",{
    items_on_form_rendered(doc) {
        cur_frm.grid_row = doc.open_grid_row();
        MakeFieldDisable(cur_frm.grid_row)
	}
})

frappe.ui.form.on("Purchase Invoice Item",{
    item_code: function(frm, cdt, cdn){
        if(cur_frm.grid_row){
            const delay = ms => new Promise(res => setTimeout(res, ms));
            const debound = async () => {
                await delay(2000);
                var row = locals[cdt][cdn]
                MakeFieldDisable(cur_frm.grid_row, row.expense_account)
              };
            debound()
        }
    },
    expense_account: function(frm, cdt,cdn){
        var row = locals[cdt][cdn]
        MakeFieldDisable(cur_frm.grid_row, row.expense_account)
    }
})


function MakeFieldDisable(grid_row, expense_account=null){
    var ledger_fields = GetFields()
    if(! expense_account){
        var expense_account = cur_frm.grid_row.get_field('expense_account').value
    }
    if(expense_account){
        frappe.call({method: "dsserp.dss_accounting.utils.get_account",args:{account: expense_account}}).then((r) => {
            var account_dict = GetHidenFieldList(r.message)
            ledger_fields.forEach((val)=>{
                grid_row.get_field(val).$input.prop('disabled', account_dict[val]? true:false);
            })
        });
    }else{
        ledger_fields.forEach((val)=>{
            grid_row.get_field(val).$input.prop('disabled',true);
        })
    }
}

function GetFields(){
    return [
        "custom_utr",
        "custom_section",
        "custom_consumer_insurance__no",
        "custom_monthly_bimonthly",
        "custom_due_date",
        "custom_disconnection_dt",
        "custom_reading__start_",
        "custom_reading__end",
        "custom_consumption",
        "custom_meeting_type",
        "custom_participant_count",
        "custom_location",
        "custom_remarks",
        "custom_month", 
        "custom_year",
        "custom_vehcile_no",
        "custom_petrol_diesel",
        "custom_claim_dt_from",
        "custom_claim_dt_to",
    ]
}

function GetHidenFieldList(account=null){
    var account_dict = {}
    var common_ledger_list = [
        "WASTE DISPOSAL",
        "FASTAG RECHARGE",
        "ADVERTISEMENT",
        "BUSINESS PROMOTION EXPENSES",
        "STATIONERY (INVENTORY MODULE)",
        "NEWSPAPER & PERIODICALS",
        "BRANCH RELOCATION EXPENSES",
        "MAINTENANCE CHARGES",
        "INAUGURATION EXPENSE",
        "COURIER",
        "PANTRY EXPENSES",
        "REFRESHMENTS",
        "POST OFFICE",
        "PRINTING (TREAT AS PURCHASE OF INVENTORY)"
    ]
    
    if(common_ledger_list.includes(account)){
        account_dict.custom_utr = false
        account_dict.custom_section = true
        account_dict.custom_consumer_insurance__no = true
        account_dict.custom_monthly_bimonthly = true
        account_dict.custom_due_date = true
        account_dict.custom_disconnection_dt = true
        account_dict.custom_reading__start_ = true
        account_dict.custom_reading__end = true
        account_dict.custom_consumption = true
        account_dict.custom_meeting_type = true
        account_dict.custom_participant_count = true
        account_dict.custom_location = true
        account_dict.custom_remarks = true
        account_dict.custom_month = true
        account_dict.custom_year = true
        account_dict.custom_vehcile_no = true
        account_dict.custom_petrol_diesel = true
        account_dict.custom_claim_dt_from = true
        account_dict.custom_claim_dt_to = true
    }
    else if(account == "INSURANCE"){
        account_dict.custom_utr = false
        account_dict.custom_consumer_insurance__no = false
        account_dict.custom_section = true
        account_dict.custom_monthly_bimonthly = true
        account_dict.custom_due_date = false
        account_dict.custom_disconnection_dt = true
        account_dict.custom_reading__start_ = true
        account_dict.custom_reading__end = true
        account_dict.custom_consumption = true
        account_dict.custom_meeting_type = true
        account_dict.custom_participant_count = true
        account_dict.custom_location = false
        account_dict.custom_remarks = true
        account_dict.custom_month = true
        account_dict.custom_year = false
        account_dict.custom_vehcile_no = true
        account_dict.custom_petrol_diesel = true
        account_dict.custom_claim_dt_from = true
        account_dict.custom_claim_dt_to = true
    }
    else if(account == "PETROL/ DIESEL CARD"){
        account_dict.custom_utr = false
        account_dict.custom_consumer_insurance__no = true
        account_dict.custom_section = true
        account_dict.custom_monthly_bimonthly = true
        account_dict.custom_due_date = true
        account_dict.custom_disconnection_dt = true
        account_dict.custom_reading__start_ = true
        account_dict.custom_reading__end = true
        account_dict.custom_consumption = true
        account_dict.custom_meeting_type = true
        account_dict.custom_participant_count = true
        account_dict.custom_location = true
        account_dict.custom_remarks = true
        account_dict.custom_month = true
        account_dict.custom_year = true
        account_dict.custom_vehcile_no = false
        account_dict.custom_petrol_diesel = false
        account_dict.custom_claim_dt_from = false
        account_dict.custom_claim_dt_to = false
    }
    else if(account == "ELECTRICITY"){
        account_dict.custom_utr = false
        account_dict.custom_consumer_insurance__no = false
        account_dict.custom_section = false
        account_dict.custom_monthly_bimonthly = false
        account_dict.custom_due_date = false
        account_dict.custom_disconnection_dt = false
        account_dict.custom_reading__start_ = false
        account_dict.custom_reading__end = false
        account_dict.custom_consumption = false
        account_dict.custom_meeting_type = true
        account_dict.custom_participant_count = true
        account_dict.custom_location = false
        account_dict.custom_remarks = true
        account_dict.custom_month = false
        account_dict.custom_year = false
        account_dict.custom_vehcile_no = true
        account_dict.custom_petrol_diesel = true
        account_dict.custom_claim_dt_from = true
        account_dict.custom_claim_dt_to = true
    }
    else if(account == "CUG CONNECTION"){
        account_dict.custom_utr = false
        account_dict.custom_consumer_insurance__no = true
        account_dict.custom_section = true
        account_dict.custom_monthly_bimonthly = true
        account_dict.custom_due_date = true
        account_dict.custom_disconnection_dt = true
        account_dict.custom_reading__start_ = true
        account_dict.custom_reading__end = true
        account_dict.custom_consumption = true
        account_dict.custom_meeting_type = true
        account_dict.custom_participant_count = true
        account_dict.custom_location = true
        account_dict.custom_remarks = true
        account_dict.custom_month = false
        account_dict.custom_year = false
        account_dict.custom_vehcile_no = false
        account_dict.custom_petrol_diesel = false
        account_dict.custom_claim_dt_from = false
        account_dict.custom_claim_dt_to = false
    }
    else if(account == "WATER CHARGES"){
        account_dict.custom_utr = false
        account_dict.custom_consumer_insurance__no = false
        account_dict.custom_section = true
        account_dict.custom_monthly_bimonthly = false
        account_dict.custom_due_date = true
        account_dict.custom_disconnection_dt = true
        account_dict.custom_reading__start_ = false
        account_dict.custom_reading__end = false
        account_dict.custom_consumption = false
        account_dict.custom_meeting_type = true
        account_dict.custom_participant_count = true
        account_dict.custom_location = true
        account_dict.custom_remarks = true
        account_dict.custom_month = false
        account_dict.custom_year = false
        account_dict.custom_vehcile_no = true
        account_dict.custom_petrol_diesel = true
        account_dict.custom_claim_dt_from = true
        account_dict.custom_claim_dt_to = true
    }
    else if(account == "MEETING EXPENSES"){
        account_dict.custom_utr = false
        account_dict.custom_consumer_insurance__no = true
        account_dict.custom_section = true
        account_dict.custom_monthly_bimonthly = true
        account_dict.custom_due_date = true
        account_dict.custom_disconnection_dt = true
        account_dict.custom_reading__start_ = true
        account_dict.custom_reading__end = true
        account_dict.custom_consumption = true
        account_dict.custom_meeting_type = false
        account_dict.custom_participant_count = false
        account_dict.custom_location = false
        account_dict.custom_remarks = false
        account_dict.custom_month = false
        account_dict.custom_year = false
        account_dict.custom_vehcile_no = true
        account_dict.custom_petrol_diesel = true
        account_dict.custom_claim_dt_from = true
        account_dict.custom_claim_dt_to = true
    }
    else if(account == "RENT"){
        account_dict.custom_utr = false
        account_dict.custom_consumer_insurance__no = true
        account_dict.custom_section = true
        account_dict.custom_monthly_bimonthly = true
        account_dict.custom_due_date = true
        account_dict.custom_disconnection_dt = true
        account_dict.custom_reading__start_ = true
        account_dict.custom_reading__end = true
        account_dict.custom_consumption = true
        account_dict.custom_meeting_type = true
        account_dict.custom_participant_count = true
        account_dict.custom_location = true
        account_dict.custom_remarks = true
        account_dict.custom_month = false
        account_dict.custom_year = false
        account_dict.custom_vehcile_no = true
        account_dict.custom_petrol_diesel = true
        account_dict.custom_claim_dt_from = true
        account_dict.custom_claim_dt_to = true
    }
    else if(account == "FUEL CHARGES"){
        account_dict.custom_utr = false
        account_dict.custom_consumer_insurance__no = true
        account_dict.custom_section = true
        account_dict.custom_monthly_bimonthly = true
        account_dict.custom_due_date = true
        account_dict.custom_disconnection_dt = true
        account_dict.custom_reading__start_ = false
        account_dict.custom_reading__end = false
        account_dict.custom_consumption = false
        account_dict.custom_meeting_type = false
        account_dict.custom_participant_count = false
        account_dict.custom_location = false
        account_dict.custom_remarks = false
        account_dict.custom_month = false
        account_dict.custom_year = false
        account_dict.custom_vehcile_no = false
        account_dict.custom_petrol_diesel = false
        account_dict.custom_claim_dt_from = false
        account_dict.custom_claim_dt_to = false
    }
    else{
        account_dict.custom_utr = true
        account_dict.custom_section = true
        account_dict.custom_consumer_insurance__no = true
        account_dict.custom_monthly_bimonthly = true
        account_dict.custom_due_date = true
        account_dict.custom_disconnection_dt = true
        account_dict.custom_reading__start_ = true
        account_dict.custom_reading__end = true
        account_dict.custom_consumption = true
        account_dict.custom_meeting_type = true
        account_dict.custom_participant_count = true
        account_dict.custom_location = true
        account_dict.custom_remarks = true
        account_dict.custom_month = true
        account_dict.custom_year = true
        account_dict.custom_vehcile_no = true
        account_dict.custom_petrol_diesel = true
        account_dict.custom_claim_dt_from = true
        account_dict.custom_claim_dt_to = true
    }

    return account_dict
}