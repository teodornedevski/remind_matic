

import React from "react";
 
// Main Author: Bing/GPT4 search/chat, with modifications by Teodor Nedevski
function Event({ description }) {
  return (
    <div >
      <span class="block bg-white sm:p-2 rounded-xl" href="">
        <div class="sm:pr-8">
          <p class="mt-2 text-sm text-black">{description}</p>
        </div>
      </span>
    </div>
  );
}
 
export default Event;