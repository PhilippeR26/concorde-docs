<?php
function debug_to_console($data)
{
	$output = $data;
	if (is_array($output))
		$output = implode(',', $output);
	echo "<script>console.log('console: " . $output . "' );</script>";
}

$msg = wordwrap($_POST['Txt1'], 70);
debug_to_console($msg);
mail('concorde.docs@free.fr', 'Message provenant du site http://concorde.docs.free.fr', $msg)
	?>


<body bgcolor="#1E435E">

	<p>&nbsp;</p>
	<p>&nbsp;</p>
	<p>&nbsp;</p>
	<p>&nbsp;</p>
	<table border="1" align="center" cellpadding="20" cellspacing="0" bordercolor="#666666" bgcolor="#FFFFFF">
		<tr>
			<td align="center">
				<p>
					<font size="2" face="Verdana, Arial, Helvetica, sans-serif"><strong>
							Votre message a bien &eacute;t&eacute; envoy&eacute;

						</strong></font>
				</p>
				<p>
					<font size="2" face="Verdana, Arial, Helvetica, sans-serif">[ <a
							href="javascript:history.go(-1)">Retour</a> ]</font>
				</p>
			</td>
		</tr>
	</table>