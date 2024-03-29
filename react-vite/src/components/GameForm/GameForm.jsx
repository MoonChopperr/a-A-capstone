import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { thunkCreateGame, thunkUpdateGame } from '../../redux/game'
import './GameForm.css'

const GENRES = [
    'Action',
    'Adventure',
    'RPG',
    'Strategy',
    'Simulation',
    'Sports',
    'Racing',
    'Puzzle',
    'Fighting',
    'Platformer',
    'Sandbox',
    'Survival',
    'Horror',
    'Stealth',
    'Battle Royale',
    'Casual',
    'Free To Play',
    'Open World',
    'Metroidvania',
    'Roguelike / Roguelite',
    'MMORPG',
    'MOBA',
    'Rhythm / Music',
    'Party / Mini-Games',
    'Visual Novel',
    'Virtual Reality'
]

const GameForm = ({ buttonName, game }) => {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const user = useSelector((state) => state.session.user)
    const { gameId } = useParams()

    const [title, setTitle] = useState(game?.title || "")
    const [about, setAbout] = useState(game?.about || "")
    const [price, setPrice] = useState(game?.price || "")
    const [releaseDate, setReleaseDate] = useState(game?.releaseDate || "")
    const [developer, setDeveloper] = useState(game?.developer || "")
    const [publisher, setPublisher] = useState(game?.publisher || "")
    const [franchise, setFranchise] = useState(game?.franchise || "")
    const [ESRB_Rating, setESRB_Rating] = useState(game?.ESRB_Rating || "")
    const [genre, setGenre] = useState(game?.genre || [])
    const [image, setImage] = useState(game?.image || null)
    const [validations, setValidations] = useState({})
    const [submitted, setSubmitted] = useState(false)

    let isValidated = false

    useEffect(() => {
        if (!user) {
            nav('/')
        }

        const errors = {}
        if (submitted) {
            if (!title) {
                errors.title = "Title field cannot be empty"
            }
            if (title.length > 30) {
                errors.title = "Title is too long, title must be less than 30 characters"
            }
            if (!about) {
                errors.about = "Add a short description of your game"
            }
            if (about.length > 193) {
                errors.about = "Description of your game is too long, it must be less than 193 characters"
            }
            if (price < 0) {
                errors.price = "Price cannot be less than $0.00"
            }

            if (!price) {
                errors.price = "Price field cannot be empty"
            }
            if (isNaN(price)) {
                errors.price = "Price must be a number"
            }
            if (!releaseDate) {
                errors.releaseDate = "Release date must be selected"
            }
            if (releaseDate) {
                const currDate = new Date()
                const selectedDate = new Date(releaseDate)
                if (selectedDate < currDate) {
                    errors.releaseDate = "Release date cannot be in the past"
                }
            }
            if (!developer) {
                errors.developer = "Developer field cannot be empty"
            }
            if (!publisher) {
                errors.publisher = "Publisher field cannot be empty"
            }
            if (!genre.length) {
                errors.genre = "Select at least one genre"
            }
            if (!image) {
                errors.image = "Please upload an image of your game"
            }
        }

        setValidations(errors)
        if (Object.keys(validations).length) {
            isValidated = true
        }
    }, [submitted, title, about, price, releaseDate, developer, publisher, franchise, ESRB_Rating, genre, image])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        if (Object.keys(validations).length > 0) {
            return
        }
        // formdata for when handling aws images
        // const newGame = {
        //     title, about, price, 'release_date': releaseDate, developer, publisher, franchise, 'ESRB_rating': ESRB_Rating, genre, 'image': formData.image
        // }
        const formData = new FormData()
        formData.append('title', title)
        formData.append('about', about)
        formData.append('price', price)
        formData.append('release_date', releaseDate)
        formData.append('developer', developer)
        formData.append('publisher', publisher)
        formData.append('franchise', franchise)
        formData.append('ESRB_rating', ESRB_Rating)
        genre.forEach((g) => formData.append('genre', g))
        formData.append('image', image)
        // await dispatch(thunkCreateGame(formData))

        if (!gameId) {
            const newGame = await dispatch(thunkCreateGame(formData))
            console.log('@@@@=>', newGame)
            if (newGame && newGame.id) {
                nav(`/game/${newGame.id}`)
            }
        } else {
            const updatedGame = await dispatch(thunkUpdateGame(gameId, formData))
            if (updatedGame && updatedGame.id) {
                console.log('@@@@@@@@=>', updatedGame)
                nav(`/game/${updatedGame.id}`)
            }
        }

    }

    const handleGenreChange = (e, selectedGenre) => {
        if (e.target.checked) {
            setGenre([...genre, selectedGenre])
        } else {
            setGenre(genre.filter((genre) => genre !== selectedGenre))
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {validations.title && <span>{validations.title}</span>}
                </div>

                <div>
                    <textarea
                        placeholder="About"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    />
                    {validations.about && <span>{validations.about}</span>}
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {validations.price && <span>{validations.price}</span>}
                </div>

                <div>
                    <input
                        type="date"
                        placeholder="Release Date"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                    />
                    {validations.releaseDate && <span>{validations.releaseDate}</span>}

                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Developer"
                        value={developer}
                        onChange={(e) => setDeveloper(e.target.value)}
                    />
                    {validations.developer && <span>{validations.developer}</span>}

                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Publisher"
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                    />
                    {validations.publisher && <span>{validations.publisher}</span>}

                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Franchise"
                        value={franchise}
                        onChange={(e) => setFranchise(e.target.value)}
                    />
                    {validations.franchise && <span>{validations.franchise}</span>}

                </div>

                <div>
                    <input
                        type="text"
                        placeholder="ESRB Rating"
                        value={ESRB_Rating}
                        onChange={(e) => setESRB_Rating(e.target.value)}
                    />
                    {validations.ESRB_Rating && <span>{validations.ESRB_Rating}</span>}

                </div>

                <div>
                    {GENRES.map((genreOption) => (
                        <div key={genreOption}>
                            <input
                                type="checkbox"
                                id={genreOption}
                                value={genreOption}
                                onChange={(e) => handleGenreChange(e, genreOption)}
                                checked={genre.includes(genreOption)}
                            />
                            <label htmlFor={genreOption}>{genreOption}</label>
                        </div>
                    ))}
                    {validations.genre && <span>{validations.genre}</span>}
                </div>

                <div>
                    <input
                        type='file'
                        accept='image/*'
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <button type='submit'>Submit</button>
                </div>

            </form>
        </>
    )
}

export default GameForm