const fs = require('fs');

module.exports = class OffKiEmailGenerator {
    constructor(templateLocation){

        // Bind functions
        this.addPurchaseItem = this.addPurchaseItem.bind(this);
        this.updateOrderInformation = this.updateOrderInformation.bind(this);
        this.render = this.render.bind(this);

        // Initialize Member Variables
        this.grandTotalPrice = 0.0;
        this.subTotalPrice = 0.0;
        this.taxPercentage = 0;
        this.taxTotal = 0;
        var date = new Date();
        this.todayDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        var hours = date.getHours();
        var AMPM = (hours > 12) ? "PM" : "AM";
        hours = (hours > 12) ? (hours - 12) : hours;
        this.nowTime = hours + ":" + date.getMinutes() + ":" + date.getSeconds() + AMPM;
        this.htmlString = "";
        this.purchaseItems = [];
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.orderID = "";
        this.licenseTier = "";
        this.purchaseItemReplaceString = "<!-- ItemList Placeholder -->"
        this.dateReplaceString = "{{Date}}";
        this.timeReplaceString = "{{Time}}";
        this.firstNameReplaceString = "{{FirstName}}";
        this.lastNameReplaceString = "{{LastName}}";
        this.emailReplaceString = "{{Email}}";
        this.orderIDReplaceString = "{{OrderID}}";
        this.subTotalReplaceString = "{{SubTotal}}";
        this.taxTotalReplaceString = "{{TaxTotal}}";
        this.grandTotalReplaceString = "{{GrandTotal}}";

        // Read the template file
        this.htmlString = fs.readFileSync(templateLocation, 'utf8');
    }

    addPurchaseItem(songName, quantity, unit_price, description) {
        let unitPriceReplaceString = "{{Price}}";
        let totalPriceReplaceString = "{{ItemPrice}}";
        let quantityReplaceString = "{{Quantity}}";
        let itemNameReplaceString = "{{Item Name}}";

        this.licenseTier = ""

        if (description.search("Basic") > 0) {
            this.licenseTier = " - Basic License";
        } else if (description.search("Premium") > 0) {
            this.licenseTier = " - Premium License";
        } else if (description.search("Exclusive") > 0) {
            this.licenseTier = " - Exclusive License";
        }

        let templateItem = `
        <tr class="item-list" style="background-color: #f3f3f3;">
            <td colspan="2" style="border-style: none;">
                <p style="margin-top: 0px;font-family: 'Roboto',Arial;color: #666666;white-space: nowrap;font-size: 10pt;">{{Item Name}}</p>
            </td>
            <td class="align-right" style="text-align: right;border-style: none;">
                <p style="margin-top: 0px;font-family: 'Roboto',Arial;color: #666666;white-space: nowrap;font-size: 10pt;">{{Quantity}}</p>
            </td>
            <td class="align-right" style="text-align: right;border-style: none;">
                <p style="margin-top: 0px;font-family: 'Roboto',Arial;color: #666666;white-space: nowrap;font-size: 10pt;">{{Price}}</p>
            </td>
            <td class="align-right" style="text-align: right;border-style: none;">
                <p style="margin-top: 0px;font-family: 'Roboto',Arial;color: #666666;white-space: nowrap;font-size: 10pt;">{{ItemPrice}}</p>
            </td>
        </tr>
        `

        let totalPrice = parseFloat(unit_price) * parseFloat(quantity);
        totalPrice = totalPrice.toFixed(2);

        templateItem = templateItem.replace(unitPriceReplaceString, "$" + unit_price);
        templateItem = templateItem.replace(totalPriceReplaceString, "$" + totalPrice.toString());
        templateItem = templateItem.replace(quantityReplaceString, quantity);
        templateItem = templateItem.replace(itemNameReplaceString, songName + this.licenseTier);

        this.purchaseItems.push(templateItem);

        this.subTotalPrice += parseFloat(totalPrice);
    }

    updateOrderInformation(firstName, lastName, email, orderID) {
        this.firstName = firstName.value;
        this.lastName = lastName.value;
        this.email = email.value;
        this.orderID = orderID;
    }

    render() {
        this.taxTotal = parseFloat(parseFloat(this.subTotalPrice) * (parseFloat(this.taxPercentage) / 100));
        this.grandTotalPrice = parseFloat(this.subTotalPrice) + this.taxTotal;
        var dateRe = new RegExp(this.dateReplaceString, "g");
        this.htmlString = this.htmlString.replace(this.purchaseItemReplaceString, this.purchaseItems.join(""));
        this.htmlString = this.htmlString.replace(dateRe, this.todayDate);
        this.htmlString = this.htmlString.replace(this.timeReplaceString, this.nowTime);
        this.htmlString = this.htmlString.replace(this.firstNameReplaceString, this.firstName);
        this.htmlString = this.htmlString.replace(this.lastNameReplaceString, this.lastName);
        this.htmlString = this.htmlString.replace(this.emailReplaceString, this.email);
        this.htmlString = this.htmlString.replace(this.orderIDReplaceString, this.orderID);
        this.htmlString = this.htmlString.replace(this.subTotalReplaceString, "$" + parseFloat(this.subTotalPrice).toFixed(2));
        this.htmlString = this.htmlString.replace(this.taxTotalReplaceString, "$" + parseFloat(this.taxTotal).toFixed(2));
        this.htmlString = this.htmlString.replace(this.grandTotalReplaceString, "$" + parseFloat(this.grandTotalPrice).toFixed(2));

        return this.htmlString;
    }
}