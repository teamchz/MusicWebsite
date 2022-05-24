const   mongoose    =   require('mongoose'),
        User        =   require('./models/user'),
        Song        =   require('./models/song'),
        Artist      =   require('./models/artist'),
        Album       =   require('./models/album'),
        playlist    =   require('./models/playlist');

const artist = [
    {
        name: "IU",
        description: "ไอยู สาวน้อยทรงพลัง อีจีอึน ชื่อจริงของไอยูที่สะท้อนเรื่องราวในชีวิตที่กว่าจะประสบความสำเร็จเป็นอย่างมากในวันนี้เธอได้ใช้ความสามารถของเธอฟันฝ่าบทพิสูจน์มามากมายเพียงใด กับเรื่องจริงที่ไม่ต่างอะไรกับละครเมื่อนางเอกอย่างไอยู",
        profileImage: "/images/artist/iu.png",
        bannerImage: "/images/artist/iu-banner.png"
    },
    {
        name: "Twice",
        description: "TWICE วงที่มีสาว ๆ ที่มีสมาชิกทั้งหมด 9 คน เป็นวงเกิร์ลกรุ๊ปที่ดังทั้งในประเทศเกาหลีและประเทศไทย เป็นวงที่มีเสน่ห์มาก ทั้งสวย น่ารัก มากความสามารถ ทำให้คนที่ได้ดูเอ็มวีเพลงของพวกเธอโดนตกไปเป็นแถว จนกลายมาเป็นแฟนคลับในที่สุด.",
        profileImage: "/images/artist/twice.png",
        bannerImage: "/images/artist/twice-banner.png"
    },
    {
        name: "Blackpink",
        description: "ถ้าพูดถึง BLACKPINK เชื่อได้ว่าคนไทยส่วนใหญ่ต้องเคยได้ยินชื่อนี้กันมาไม่มากก็น้อย เป็นวงที่มีอิทธิพลทั้งด้านเพลงและแฟชั่น ถ้านึกถึงเกิร์ลกรุ๊ปของประเทศเกาหลีใต้ก็ต้องนึกถึงวงBLACKPINK",
        profileImage: "/images/artist/blackpink.png",
        bannerImage: "/images/artist/blackpink-banner.png"
    },
    {
        name: "HoneyWorks",
        description: "简称Haniwa或HW，是日本VOCALOID乐团，也是Niconico动画的使用者，其作品上传到该网站。他们于2010年正式成立，并在2014年1月29日以专辑《从好久以前就喜欢你。》正式出道。除此之外，HoneyWorks还会把较受欢迎的曲子改编成短篇动画、漫画和小说。",
        profileImage: "/images/artist/hw.png",
        bannerImage: "/images/artist/hw-banner.png"
    }
]
new mongoose.Schema


function seedDB(){
    // User.remove({},function(err){
    //     if(err){
    //         console.log(err)
    //     } else {
    //         console.log('All User Removed!');
    //     }
    // });

    // playlist.remove({}, function(err) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("All Playlist Removed!")
    //     }
    // })

    // Album.remove({}, function(err) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log('All Album Removed!')
    //     }
    // })

    // Artist.remove({}, function(err) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("All Artist Removed!")
    //     }
    // })

    // artist.forEach(function(seed) {
    //     Artist.create(seed, function(err, artist) {
    //         if (err) {
    //             console.log(err)
    //         } else {
    //             console.log("New Artist Added!")
    //         }
    //     })
    // })

    // Song.remove({}, function(err) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("All Song Removed!")
    //     }
    // })

}

module.exports = seedDB;