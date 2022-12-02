from pathlib import Path
names = list(Path('public/audio/masu').glob('*.wav'))
words = [str(n).split('/')[-1].split('.')[0] for n in names]
updated_words = {}

for word in words:
    new_word = ''
    i = 0
    while i < len(word):
        if i < len(word) - 1 and word[i+1] == '\u3099': # combining "
            cur = word[i]
            new = chr(ord(cur) + 1)
            print(f'{cur} -> {new}')
            new_word += new
            i += 2
        elif i < len(word) - 1 and word[i+1] == '\u309A':
            cur = word[i]
            new = chr(ord(cur) + 2)
            print(f'{cur} -> {new}')
            new_word += new
            i += 2
        else:
            new_word += word[i]
            i += 1
    updated_words[word] = new_word

print(updated_words)

import os

for filename in names:
    old_name = str(filename)
    old_word = old_name.split('/')[-1].split('.')[0]
    new_name = '/'.join(old_name.split('/')[:-1]) + '/' + updated_words[old_word] + '.wav'
    if old_name != new_name:
        print(filename, new_name)
        os.rename(old_name, new_name)