package ip.availability;

import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class Time {

	public String get_current() {
		DateFormat dateFormat = new SimpleDateFormat("dd.MM.yy HH:mm:ss");
		return dateFormat.format(new Date());
	}
	
}
