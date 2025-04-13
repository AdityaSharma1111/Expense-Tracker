import React from 'react'

function CharAvatar({ fullName, width = "w-20", height = "h-20", style = "text-xl" }) {
  const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
      initials += words[i][0];
    }

    return initials.toUpperCase();
  }

  return (
    <div
      className={`bg-gray-300 text-gray-800 font-semibold rounded-full flex items-center justify-center ${width} ${height} ${style}`}
    >
      {getInitials(fullName)}
    </div>
  );
}

export default CharAvatar;
