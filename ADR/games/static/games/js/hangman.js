const words = ["abandoned", "aberrant", "abject", "able", "abnormal", "aboard", "aboriginal", "abortive", "abrasive", "abrupt", "absent", "absorbed", "absorbing", "abstracted", "absurd", "abundant", "abusive", "accept", "acceptable", "accessible", "accidental", "account", "accurate", "achiever", "acid", "acidic", "acoustic", "acoustics", "acrid", "act", "action", "activity", "actor", "actually", "ad hoc", "adamant", "adaptable", "add", "addicted", "addition", "adhesive", "adjoining", "adjustment", "admire", "admit", "adorable", "adventurous", "advertisement", "advice", "advise", "afford", "afraid", "aftermath", "afternoon", "afterthought", "aggressive", "agonizing", "agree", "agreeable", "agreement", "ahead", "air", "airplane", "airport", "ajar", "alarm", "alcoholic", "alert", "alike", "alive", "alleged", "allow", "alluring", "aloof", "amazing", "ambiguous", "ambitious", "amount", "amuck", "amuse", "amused", "amusement", "amusing", "analyze", "ancient", "anger", "angle", "angry", "animal", "animated", "announce", "annoy", "annoyed", "annoying", "answer", "ants", "anxious", "apathetic", "apologise", "apparatus", "apparel", "appear", "applaud", "appliance", "appreciate", "approval", "approve", "aquatic", "arch", "argue", "argument", "arithmetic", "arm", "army", "aromatic", "arrange", "arrest", "arrive", "arrogant", "art", "ashamed", "ask", "aspiring", "assorted", "astonishing", "attach", "attack", "attempt", "attend", "attract", "attraction", "attractive", "aunt", "auspicious", "authority", "automatic", "available", "average", "avoid", "awake", "aware", "awesome", "awful", "axiomatic", "babies", "baby", "back", "bad", "badge", "bag", "bait", "bake", "balance", "ball", "ban", "bang", "barbarous", "bare", "base", "baseball", "bashful", "basin", "basket", "basketball", "bat", "bath", "bathe", "battle", "bawdy", "bead", "beam", "bear", "beautiful", "bed", "bedroom", "beds", "bee", "beef", "befitting", "beg", "beginner", "behave", "behavior", "belief", "believe", "bell", "belligerent", "bells", "belong", "beneficial", "bent", "berry", "berserk", "best", "better", "bewildered", "big", "bike", "bikes", "billowy", "bird", "birds", "birth", "birthday", "bit", "bite", "bite-sized", "bitter", "bizarre", "black", "black-and-white", "blade", "bleach", "bless", "blind", "blink", "blood", "bloody", "blot", "blow", "blue", "blue-eyed", "blush", "blushing", "board", "boast", "boat", "boil", "boiling", "bolt", "bomb", "bone", "book", "books", "boorish", "boot", "border", "bore", "bored", "boring", "borrow", "bottle", "bounce", "bouncy", "boundless", "bow", "box", "boy", "brainy", "brake", "branch", "brash", "brass", "brave", "brawny", "breakable", "breath", "breathe", "breezy", "brick", "bridge", "brief", "bright", "brighten", "bristle", "brother", "brown", "bruise", "brush", "bubble", "bucket", "building", "bulb", "bulge", "bulk", "bulky", "bumpy", "bunch", "burly", "burn", "burst", "bury", "bushes", "business", "bustling", "busy", "butter", "button", "buzz", "cabbage", "cable", "cactus", "cagey", "cake", "cakes", "calculate", "calculating", "calculator", "calendar", "call", "callous", "calm", "camera", "camp", "can", "cannon", "canvas", "cap", "capable", "capricious", "caption", "car", "card", "care", "careful", "careless", "caring", "carpenter", "carriage", "carry", "cars", "cart", "carve", "cast", "cat", "cats", "cattle", "cause", "cautious", "cave", "ceaseless", "celery", "cellar", "cemetery", "cent", "certain", "chalk", "challenge", "challenging", "champion", "chance", "change", "changeable", "channel", "charge", "charming", "chase", "cheap", "cheat", "check", "cheer", "cheerful", "cheese", "chemical", "cherries", "cherry", "chess", "chew", "chicken", "chief", "childlike", "children", "chilly", "chin", "chivalrous", "chocolate", "choice", "chop", "chubby", "chunky", "church", "circle", "claim", "clam", "clammy", "clap", "class", "classy", "clean", "clear", "clever", "clip", "cloistered", "close", "closed", "cloth", "cloudy", "clover", "club", "clumsy", "cluttered", "coach", "coal", "coast", "coat", "cobweb", "coherent", "coil", "cold", "collect", "color", "colorful", "colour", "comb", "combative", "comfortable", "command", "committee", "common", "communicate", "company", "compare", "comparison", "compete", "competition", "complain", "complete", "complex", "concentrate", "concern", "concerned", "concert", "conclude", "conclusion", "concrete", "condition", "confess", "confused", "connect", "connection", "conscious", "consider", "consist", "console", "constant", "contain", "control", "cooing", "cook", "cool", "cooperative", "coordinated", "copper", "copy", "corn", "correct", "cost", "cough", "counselor", "count", "country", "courageous", "cover", "cow", "cowardly", "cows", "crabby", "crack", "cracker", "crash", "crate", "craven", "crawl", "crayon", "crazy", "cream", "creator", "creature", "credit", "creepy", "crib", "crime", "crook", "crooked", "cross", "crow", "crowd", "crowded", "crown", "cruel", "crush", "cry", "cub", "cuddly", "cultured", "cumbersome", "cup", "cure", "curious", "curl", "curly", "current", "curtain", "curve", "curved", "curvy", "cushion", "cut", "cute", "cycle", "cynical", "dad", "daffy", "daily", "dam", "damage", "damaged", "damaging", "damp", "dance", "dangerous", "dapper", "dare", "dark", "dashing", "daughter", "day", "dazzling", "dead", "deadpan", "deafening", "dear", "death", "debonair", "debt", "decay", "deceive", "decide", "decision", "decisive", "decorate", "decrease", "decisive", "deep", "deeply", "deer", "defeated", "defective", "defiant", "definite", "definitional", "degree", "delay", "delicate", "delicious", "delight", "delightful", "delirious", "deliver", "delirious", "deluxe", "demand", "demonic", "dense", "dent", "dented", "deny", "depend", "dependent", "depressed", "deranged", "describe", "descriptive", "desert", "deserve", "design", "desire", "desk", "destroy", "destruction", "detail", "detailed", "detect", "determined", "develop", "development", "devilish", "devote", "devoted", "detailed", "diamond", "dictionary", "didactic", "die", "different", "difficult", "digestion", "diligent", "dime", "dinner", "dinosaurs", "direction", "direful", "dirt", "dirty", "disagree", "disagreeable", "disappear", "disapprove", "disarm", "disastrous", "discover", "discovery", "discreet", "discussion", "disgusted", "disgusting", "disillusioned", "dislike", "dispensable", "distance", "distinct", "distribution", "disturbed", "divergent", "divide", "division", "dizzy", "dock", "doctor", "dog", "dogs", "doll", "dolls", "domineering", "donkey", "door", "double", "doubt", "doubtful", "downtown", "drab", "draconian", "drag", "drain", "drained", "drainpipe", "dramatic", "drawer", "dream", "dreary", "driving", "drop", "drown", "drum", "drunk", "dry", "duck", "ducks", "dull", "dusty", "dynamic", "dysfunctional", "eager", "ear", "early", "earn", "earsplitting", "earth", "earthquake", "earthy", "easy", "eatable", "economic", "edge", "educated", "education", "educational", "effective", "efficacious", "efficient", "egg", "eggnog", "eggs", "eight", "elastic", "elated", "elbow", "elderly", "electric", "elegant", "elfin", "elite", "embarrass", "embarrassed", "embarrassment", "embryo", "eminent", "employ", "empty", "enchanted", "enchanting", "encourage", "encouraging", "end", "endurable", "energetic", "engine", "enjoy", "enormous", "enter", "entertain", "entertaining", "enthusiastic", "entire", "entrance", "envious", "environment", "equal", "equable", "equinox", "equipment", "equivalent", "erratic", "error", "escape", "evanescent", "evasive", "even", "event", "excellent", "exchange", "excite", "excited", "exciting", "exclusive", "excuse", "exercise", "exist", "existence", "exotic", "expand", "expansion", "expect", "expensive", "experience", "expert", "explain", "explosion", "exponential", "express", "extension", "extra-large", "extra-small", "extraneous", "extraordinary", "exuberant", "exultant", "eye", "eyes", "fabulous", "face", "fact", "fade", "faded", "fail", "faint", "fair", "fairies", "faithful", "fall", "fallacious", "false", "familiar", "famous", "fanatical", "fancy", "fang", "fantastic", "far", "far-flung", "farm", "fascinated", "fast", "fasten", "fat", "faulty", "fax", "fear", "fearful", "fearless", "feeble", "feeling", "feigned", "female", "fence", "fencing", "fertile", "festive", "fetch", "few", "field", "fierce", "file", "fill", "film", "filthy", "fine", "finger", "finicky", "fire", "fireman", "first", "fish", "fit", "five", "fix", "fixed", "flag", "flagrant", "flaky", "flame", "flap", "flash", "flashy", "flat", "flavor", "flawless", "flesh", "flight", "flimsy", "flippant", "float", "flock", "flood", "floor", "floppy", "fluffy", "fluid", "fluent", "fluffy", "fly", "foamy", "fog", "fold", "follow", "food", "fool", "foolish", "foot", "force", "forceful", "foregoing", "forgetful", "fork", "form", "formal", "fortunate", "found", "four", "fowl", "frame", "frantic", "free", "freezing", "frequent", "fresh", "fretful", "friction", "friend", "friendly", "friends", "frighten", "frightened", "frightening", "frigid", "frilly", "frivolous", "frog", "front", "frothy", "frown", "fruit", "fruitful", "fry", "fuel", "full", "fumbling", "functional", "funny", "furniture", "furry", "furtive", "future", "futuristic", "fuzzy", "gabby", "gainful", "gamy", "gaping", "garrulous", "gaseous", "gate", "gather", "gaudy", "gaze", "gear", "geese", "general", "gentle", "giant", "giants", "giddy", "gifted", "gigantic", "giraffe", "girl", "girls", "glamorous", "glib", "glistening", "glorious", "glossy", "glove", "glow", "glue", "godly", "gold", "good", "goofy", "gorgeous", "government", "governor", "grab", "graceful", "grade", "grain", "grandfather", "grandmother", "grape", "grass", "grate", "grateful", "gratis", "grave", "gray", "grease", "greasy", "great", "greedy", "green", "greet", "grey", "grieving", "grin", "grip", "groan", "groovy", "grotesque", "grouchy", "ground", "group", "growth", "grubby", "gruesome", "grumpy", "guarantee", "guard", "guarded", "guess", "guide", "guiltless", "guilty", "guitar", "gullible", "gun", "gusty", "guttural", "habitual", "hair", "haircut", "half", "hall", "hallowed", "halting", "hammer", "hand", "handle", "handsome", "handsomely", "handy", "hang", "hanging", "hapless", "happen", "happy", "harass", "harbor", "hard", "hard-to-find", "harm", "harmonious", "harmony", "harsh", "hat", "hate", "hateful", "haunt", "head", "heady", "heal", "health", "healthy", "heap", "hear", "hearing", "heartbreaking", "heat", "heavenly", "heavy", "hellish", "help", "helpful", "helpless", "hesitant", "hideous", "high", "highfalutin", "high-pitched", "hilarious", "hill", "hissing", "historical", "history", "hobbies", "hole", "holiday", "holistic", "hollow", "home", "homeless", "homely", "honey", "honorable", "hook", "hope", "hopeful", "horn", "horrible", "horse", "horses", "hose", "hospital", "hot", "hour", "house", "houses", "hover", "hug", "huge", "hulking", "hum", "humdrum", "humorous", "hungry", "hunt", "hurried", "hurry", "hurt", "hushed", "husky", "hydrant", "hypnotic", "hysterical", "ice", "icky", "icy", "idea", "identify", "idiotic", "ignite", "ignore", "ill", "illegal", "ill-fated", "ill-informed", "illustrious", "imaginary", "imagine", "imbibe", "imbustible", "imitate", "immense", "imminent", "immune", "impact", "impartial", "imperfect", "import", "important", "impossible", "impress", "impression", "impressive", "improve", "impulse", "incandescent", "inch", "include", "income", "increase", "incredible", "industrious", "industry", "inexpensive", "infamous", "influence", "inform", "inject", "injure", "ink", "innate", "innocent", "innovate", "innocent", "inquisitive", "insect", "insidious", "instinctive", "instruct", "instrument", "insurance", "intelligent", "intend", "interest", "interesting", "interfere", "internal", "interrupt", "introduce", "invent", "inventive", "invite", "irate", "iron", "irritate", "island", "itch", "itchy", "jaded", "jagged", "jail", "jam", "james", "jazzy", "jealous", "jeans", "jelly", "jellyfish", "jewel", "jittery", "jobless", "jog", "join", "joke", "jolly", "joyous", "judge", "judicious", "juggle", "juice", "juicy", "jumbled", "jump", "jumpy", "juvenile", "kaput", "keen", "kettle", "key", "kick", "kind", "kindly", "kindhearted", "kiss", "kittens", "kitty", "knee", "kneel", "knight", "knit", "knot", "knotty", "knowing", "knowledge", "knowledgeable", "known", "label", "laborer", "lace", "lackadaisical", "ladybug", "lake", "lamentable", "lamp", "land", "language", "languid", "large", "last", "late", "laugh", "laughable", "launch", "lavish", "lazy", "lean", "learn", "learned", "leather", "left", "leg", "legal", "lethal", "letter", "letters", "lettuce", "level", "lewd", "library", "license", "lick", "lie", "light", "lighten", "like", "likeable", "limit", "limping", "line", "linen", "lip", "liquid", "list", "listen", "literary", "little", "live", "lively", "living", "load", "loaf", "lock", "locket", "lonely", "long", "long-term", "longing", "look", "loose", "lopsided", "loss", "loud", "loutish", "love", "lovely", "loving", "low", "lowly", "lucky", "ludicrous", "lugubrious", "lumpy", "lush", "luxuriant", "lying", "lyrical", "macabre", "machine", "maddening", "madly", "magenta", "magic", "magical", "magnificent", "maid", "mailbox", "majestic", "makeshift", "male", "malicious", "mall", "mammoth", "man", "manage", "maniacal", "many", "marble", "march", "mark", "marked", "market", "married", "marry", "marvelous", "mask", "mass", "massive", "match", "mate", "material", "materialistic", "math", "mature", "meal", "mean", "measly", "measure", "meat", "meaty", "meddle", "medical", "meek", "meeting", "mellow", "melodic", "melt", "memorize", "memory", "men", "menacing", "mental", "mere", "mess", "mess up", "message", "metal", "metallic", "mice", "middle", "mighty", "military", "milk", "milky", "mind", "mindless", "mine", "miniature", "minister", "minor", "mint", "minute", "miscreant", "miss", "mist", "mistake"];
let word = '';
let wordLetters = new Set();
let alphabet = new Set('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
let usedLetters = new Set();
let lives = 7;

// Functions
function getValidWord(words) {
    let word = words[Math.floor(Math.random() * words.length)];
    while (word.includes('-') || word.includes(' ')) {
        word = words[Math.floor(Math.random() * words.length)];
    }
    return word.toUpperCase();
}

function setup() {
    word = getValidWord(words);
    wordLetters = new Set(word);
    displayWord();
}

function displayWord() {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';
    word.split('').forEach(letter => {
        const span = document.createElement('span');
        span.textContent = usedLetters.has(letter) ? letter : '-';
        wordContainer.appendChild(span);
    });
}

function updateUsedLetters() {
    const usedLettersList = document.getElementById('used-letters-list');
    usedLettersList.textContent = [...usedLetters].join(' ');
}

function updateLives() {
    const livesCount = document.getElementById('lives-count');
    livesCount.textContent = lives;
}

function checkGameOver() {
    if (lives === 0) {
        alert('You died, sorry. The word was ' + word);
        resetGame();
    } else if ([...wordLetters].every(letter => usedLetters.has(letter))) {
        alert('YAY! You guessed the word ' + word + '!!');
        resetGame();
    }
}

function resetGame() {
    usedLetters.clear();
    // usedLettersList.textContent = ['']
    setup();
    lives = 7;
    updateLives();
}

// Game
document.addEventListener('DOMContentLoaded', () => {
    setup();

    const guessButton = document.getElementById('guess-button');
    const guessInput = document.getElementById('guess-input');

    // Popup
    const popupContainer = document.getElementById('popup-container');
    const popupMessage = document.getElementById('popup-message');

    guessInput.addEventListener('keydown', function (event) {
        if (event.keyCode === 13) {
            guessButton.click();
        }
    });

    guessButton.addEventListener('click', () => {
        const guess = guessInput.value.toUpperCase();
        guessInput.value = '';

        if (!alphabet.has(guess)) {
            popupMessage.textContent = 'That is not a valid letter.';
            popupContainer.classList.remove('hide'); // remove hide class
            popupContainer.classList.add('show');
            setTimeout(() => {
                popupContainer.classList.remove('show'); // remove show class
                popupContainer.classList.add('hide');
            }, 2000);
            return;
        }

        if (usedLetters.has(guess)) {
            popupMessage.textContent = 'You have already used that character. Please try again.';
            popupContainer.classList.remove('hide'); // remove hide class
            popupContainer.classList.add('show');
            setTimeout(() => {
                popupContainer.classList.remove('show'); // remove show class
                popupContainer.classList.add('hide');
            }, 2000);
            return;
        }

        usedLetters.add(guess);

        if (wordLetters.has(guess)) {
            popupMessage.textContent = 'Correct guess!';
            popupContainer.classList.remove('hide'); // remove hide class
            popupContainer.classList.add('show');
            setTimeout(() => {
                popupContainer.classList.remove('show'); // remove show class
                popupContainer.classList.add('hide');
            }, 2000);
        } else {
            lives--;
            popupMessage.textContent = 'Incorrect guess!';
            popupContainer.classList.remove('hide'); // remove hide class
            popupContainer.classList.add('show');
            setTimeout(() => {
                popupContainer.classList.remove('show'); // remove show class
                popupContainer.classList.add('hide');
            }, 2000);
        }

        displayWord();
        updateUsedLetters();
        updateLives();
        checkGameOver();
    });
});
