import Link from "next/link";

function Button(buttonName, url,bool,onclick) {
  return (
    <Link href={url}>
      <button onClick={()=>{console.log("LOL");onclick();}} disabled= {bool} type="button" className="btn btn-primary">
        {buttonName}
      </button>
    </Link>
  );
}

export default Button;
