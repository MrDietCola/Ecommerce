# Ecommerce

https://github.com/Seidler93/Ecommerce

https://www.youtube.com/watch?v=7q9dMxxWjxY&ab_channel=AJSeidler

## Description
This is an ecommerce database example that allows the user to view products, tags or categories as well as create, update and delete these as well. 

![Alt text](<assets/Screenshot (27).png>)

<video src="assets/Untitled_%20Oct%2027,%202023%209_28%20PM%20(video-converter.com).mp4" controls title="Title"></video>

## Installation

N/A

## Usage

The purpose of this program is to demonstrate the structure and data flow of interacting with a mysql database and how to do complete each possible fetch method of the data. 

## License

N/A




router.post('/', async (req, res) => {
  try {
    const userFriendsData = await Friends.findAll({
      where: {
        user_id: req.session.user.id
      },
      include: [
        {
          model: User,
          foreignKey: 'friend_id',
          attributes: { exclude: ['password'] },
        },
      ]
    });
    const friends =  userFriendsData.map(friend => friend.get({ plain: true }))

    for (const friend of friends) {
      if (friend.friend_id == req.body.friend_id && friend.user_id == req.body.user_id) {
        res.status(404).json({ message: 'you are already friends!' });
        return
      } 
    }
    
    const friendsData = await Friends.create(req.body);
    res.status(200).json(friendsData);
  } catch (err) {
    res.status(400).json(err);
  }
});