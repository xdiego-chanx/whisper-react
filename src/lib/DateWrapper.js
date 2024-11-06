export default class DateWrapper extends Date {

    constructor(value) {
        if(value === undefined) {
            super(Date.now());
        } else {
            super(value);
        }
    }

    toMysqlDateTime() {
        const YYYY = this.getFullYear();
        const MM = String(this.getMonth() + 1).padStart(2, "0");
        const DD = String(this.getDate()).padStart(2, "0");
        const hh = String(this.getHours()).padStart(2, '0');
        const mm = String(this.getMinutes()).padStart(2, '0');
        const ss = String(this.getSeconds()).padStart(2, '0');

        return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
    }

    toReadableDate(){
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          
        return `${days[this.getDay()]}, ${months[this.getMonth()]} ${this.getDate()}, ${this.getFullYear()}`;
    }

    toMessageTimeStamp(){
        const timestamp = [];
        const now = new DateWrapper();

        let date = `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`;

        if(this.getFullYear() == now.getFullYear() && this.getMonth() == now.getMonth()) {
            if(this.getDate() == now.getDate()) {
                date = "Today";
            } else if(this.getDate() + 1 == now.getDate()) {
                date = "Yesterday";
            }
        }

        timestamp.push(date);
        timestamp.push("at");

        const meridian = this.getHours() >= 12 ? "PM" : "AM";

        timestamp.push(String((this.getHours()%12 || 12)) + ":" + String(this.getMinutes()).padStart(2, "0"));
        timestamp.push(meridian);

        return timestamp.join(" ");
    }
}