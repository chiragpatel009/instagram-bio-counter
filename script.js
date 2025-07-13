document.addEventListener('DOMContentLoaded', function() {
    const bioInput = document.getElementById('bioInput');
    const totalCharCountSpan = document.getElementById('totalCharCount');
    const emojiCountSpan = document.getElementById('emojiCount');
    const normalCharCountSpan = document.getElementById('normalCharCount');
    const warningMessage = document.getElementById('warningMessage');
    const INSTAGRAM_LIMIT = 150;

    const emojiRegex = /(©|®|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])(?:\ufe0f)?(?:[\u200d\u20e3\ufe0f]|\ud83c[\udffb-\udfff])*/g;

    function countCharacters() {
        const text = bioInput.value;
        let totalCharacterCount = 0;
        let emojiCharacters = 0;
        let normalCharacters = 0;
        let lastIndex = 0;

        const matches = [...text.matchAll(emojiRegex)];

        matches.forEach(match => {
            const emoji = match[0];
            const startIndex = match.index;
            normalCharacters += (startIndex - lastIndex);
            emojiCharacters++;
            totalCharacterCount += 2;
            lastIndex = startIndex + emoji.length;
        });

        normalCharacters += (text.length - lastIndex);
        totalCharacterCount += normalCharacters;

        totalCharCountSpan.textContent = totalCharacterCount;
        emojiCountSpan.textContent = emojiCharacters;
        normalCharCountSpan.textContent = normalCharacters;

        if (totalCharacterCount > INSTAGRAM_LIMIT) {
            totalCharCountSpan.style.color = '#ff4500';
            warningMessage.style.display = 'block';
        } else {
            totalCharCountSpan.style.color = '#007bff';
            warningMessage.style.display = 'none';
        }
    }

    bioInput.addEventListener('input', countCharacters);
    countCharacters();
});
