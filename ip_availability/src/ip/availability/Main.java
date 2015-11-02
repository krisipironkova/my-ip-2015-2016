package ip.availability;

import java.util.HashMap;
import java.util.ArrayList;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Scanner;

public class Main {

		public static void main(String[] args) {
			final Map<String, Boolean> users = new HashMap<String, Boolean>();		
			final Map<String, Integer> logged_count = new HashMap<String, Integer>();
			
			final Time date = new Time();
			
			while(true){
				System.out.print("Enter command: ");
				final Scanner input = new Scanner(System.in);
				final String command = input.next();
				final readInput cmd = new readInput(command);
				
				switch(cmd.get_command()){
					case "login":
						if(!(users.containsKey(cmd.get_name()))){
							System.out.println("Result: ok");
							users.put(cmd.get_name(), true);
							
						}else System.out.println("error:already logged in");
						break;
						
					case "logout":
						if(users.containsKey(cmd.get_name())){
							users.put(cmd.get_name(), false);
							System.out.println("Result: ok");
						}else{
							System.out.println("error:notlogged");
						}
						break;
						
					case "info":
						if(!(users.containsKey(cmd.get_name()))) System.out.println("error:notlogged");
						else
							System.out.println("Ok:" + cmd.get_info_name()+":");
						break;
					case "shutdown":
						return;
					case "listavailable":
						System.out.print("ok");
						for (Entry<String, Boolean> user : users.entrySet()) { 
							String key = user.getKey();
							Boolean value = user.getValue();
							
							if (value)
								System.out.print(key);
						}
						break;
						
					default:
						System.out.println("error:unknown command");
						break;
				}	
				
			}				
						
		}

	}

