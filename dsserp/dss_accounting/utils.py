import frappe


@frappe.whitelist()
def get_account(account):
    return frappe.db.get_value(
        "Account",
        account,
        "account_name"
    )
