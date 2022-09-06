import React, {  useState } from 'react'
import { NavLink } from 'react-router-dom'

let Image;
//let isloading =true;

function UploadImage() {
    let value; 
   // const [loading, setLoading] = useState(true)
    const [imageSelected, setImageSelected] = useState('')

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    function setCookie(cvalue) {
        value = getCookie('num')
        value++
        document.cookie= `num=${value}; path=/`
        document.cookie = `${value}=${cvalue};path=/;`;     
      }
    
    const uploadImage = async () =>{
        const files = imageSelected
        const data = new FormData()
        data.append('file',files)
        data.append('upload_preset','kaidly1w')
      //  setLoading(true)
        const res = await fetch('https://api.cloudinary.com/v1_1/aman2000/image/upload',
    {
        method: 'POST',
        body: data
    })

    const file = await res.json() 
    setImageSelected(file.secure_url)
    if(imageSelected!=='' && imageSelected!==undefined){
    //    setLoading(false)
        setCookie(file.secure_url)
    }
    }

    Image = imageSelected;
   // isloading = loading;

    return (
        <div>
            <div className="container-fluid nav_bg">
                    <div className="row mt-5 mb-5 ms-2">
                        <div className="col-8 mx-auto text-center whiteDiv"> 
                        
                        <h3 className='profileName text-center'>New Post</h3>
                        <div className='activity mt-5 p-5 text-left'>
                        <input type="file" name='file' placeholder='Upload An Image' className='ms-5 mb-5 mt-5 ps-5 text-center inputImg' onChange={(event)=>{
                            setImageSelected(event.target.files[0])
                        }}  /> <br />
                        <NavLink activeClassName="menu_active" exact className=" btn btn-primary" to='/upload' onClick={uploadImage}>Submit</NavLink>
                        {
                            loading?(
                                <div className='m-5 p-5'></div>
                            ):(<div>
                                <img src={imageSelected} className="Images" alt=""  />
                                <h4 className='profileName text-center'>Posted Sucessfully</h4>
                                <h5 className='text-center'>Go to home page to checkout</h5>
                                </div>
                            )
                        }
                        </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default UploadImage
//export {Image,isloading}
