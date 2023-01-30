
function GenericLinkTag(){
	
	return (
    <a title={linkTitle} href="#" className={classProps}>
    {props.children}
    </a>
	);

}

export default GenericLinkTag;