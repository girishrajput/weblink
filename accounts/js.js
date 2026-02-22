
function openwin(file,Iwidth,Iheight) {
	
   var newWin1 = window.open(file,'iypWin1','x=0,y=0,toolbar=no,location=no,directories=no,status=no,scrollbars=yes, copyhistory=no,width='+Iwidth+',height='+Iheight+',screenX=0,screenY=0,left=20,top=20');
}
function validate_email(frm) {
	
	if(frm.f_username.value=="") {
		
		alert("Please Enter Your Username.");
		frm.f_username.focus();
		return false;
	}
	var email_str = frm.f_username.value;
	
	var filter=/^.+@.+\..{2,3}$/;
	
	if(!(filter.test(email_str))) {
			
		alert("Please enter valid Username");
		frm.f_username.focus();
		return false;
	}
}
function validate_member_login(frm) {
	
	if(frm.username.value=="") {
		
		alert("Please Enter Your Username.");
		frm.username.focus();
		return false;
	}
	var email_str = frm.username.value;
	
	var filter=/^.+@.+\..{2,3}$/;
	
	if(!(filter.test(email_str))) {
			
		alert("Please enter valid Username");
		frm.username.focus();
		return false;
	}
	if(frm.pass.value=="") {
		
		alert("Please Enter Password.");
		frm.pass.focus();
		return false;
	}
}
function change_mem_password(frm) {
	
	if(frm.old_pass.value=="") {
		
		alert("Please Enter Your Old Password.");
		frm.old_pass.focus();
		return false;
	}
	if(frm.new_pass.value=="") {
		
		alert("Please Enter Your New Password.");
		frm.new_pass.focus();
		return false;
	}
	if(frm.re_new_pass.value=="") {
		
		alert("Please Re - Enter New Password.");
		frm.re_new_pass.focus();
		return false;
	}
	if(frm.re_new_pass.value!=frm.new_pass.value) {
		
		alert("New Password Must be Same.");
		frm.new_pass.focus();
		return false;
	}
} 