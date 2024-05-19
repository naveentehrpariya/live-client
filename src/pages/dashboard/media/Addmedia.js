import React, { useState } from 'react'
import Popup from '../../common/Popup'

export default function Addmedia() {
   const [uploading, setUploading] = useState(false);
  return (
   <>
      <Popup space={'p-6 sm:p-10'} btntext={"+ Add More"} btnclasses={'bg-main text-white rounded-[30px] px-3 md:px-4 py-[4px] md:py-[13px] text-[12px] md:text-[15px] font-bold uppercase  '} >
            <div class="flex justify-center w-full mx-auto">
               <div class=" w-full bg-white sm:rounded-lg">
                  <div class="mb-4 md:mb-10 text-center">
                        <h2 class="text-xl sm:text-2xl font-semibold mb-2">Upload your files</h2>
                        <p class="text-xs text-gray-500">File should be of format .mp4, .png, .jpeg or .jpg</p>
                  </div>
                  <div class="relative w-full max-w-xs mb-10 p-8 bg-white bg-gray-200 rounded-lg border border-dashed m-auto">
                        <input type="file" id="file-upload" class="hidden" />
                        <label for="file-upload" class="z-20 flex flex-col-reverse items-center justify-center w-full cursor-pointer">
                           <p class="z-10 text-xs font-light text-center text-gray-500">Drag & Drop your files here</p>
                           <svg class="z-10 w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                           </svg>
                        </label>
                  </div>
                  <div className='flex justify-center'>
                     <button className='btn w-full max-w-xs' >{uploading ? "Uploading.." : "Upload"}</button>
                  </div>
               </div>
            </div>
      </Popup>
   </>
  )
}
