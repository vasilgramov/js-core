function decode(array) {
    let specialKey = array.shift();

    let messagePattern = "((?: |^)";

    for(let i = 0; i < specialKey.length; i++){
        messagePattern += "[" + specialKey[i].toLowerCase() + specialKey[i].toUpperCase() + "]";
    }

    messagePattern += "[ ]+)([!#$%A-Z]{8,})( |\\.|,|$)";

    // console.log(messagePattern);

    let messageRegex = new RegExp(messagePattern,'g');

    for(let i = 0; i < array.length; i++){
        let line = array[i].replace(messageRegex, replacer);
        console.log(line);
    }

    function replacer(match,group1,group2,group3){
        group2 = group2.replace(/!/g,'1')
            .replace(/%/g, '2')
            .replace(/\#/g,'3')
            .replace(/\$/g,'4')
            .replace(/[A-Z]/g, x=>x.toLowerCase());

        // console.log(group1);
        // console.log(group2);
        // console.log(group3);

        return group1 + group2 + group3;
    }
}

decode([
"hiddenTrap",
"Now the ultimate hiddenTrap HIDDENTR just some text hiddenTrap HIDDENTR",
"who said the message couldn't be contained in the key",
"or it could be this HIDDENTRAP, HIDDENTRAP HIDDENTRA",
"some more tests this one is wrong (HIDDENTRAP HIDDENTRA)",
"now with some spaces HIDDENTRAP         HIDDENTRA  HIDDENTRAP  HIDDENTR",
"hiddenTrap HiddenTRA, hiddenTrap HIDDENTRA"
]);

// decode([
// "miXedTestS",
// "This should be correct - mixedtests          ISCORRECTOK,",
// "not this one though remiXedTestS ITSWRONGKIDS",
// "as is this one mixedtestsos               TOTALL!WRONG",
// "Now on to the correct ones MIXEDTESTS  WHYSHOULDITFAIL or this MiXeDtEsTs OK!DOK!LOK!",
// "and here are some more",
// "mIXeDtEsTS JUS!%T#SO!!M$%%ST##!$FF",
// "MIXEDtests ITSF!%NERE#$LLY. mixedTESTS   ANOTHEROKONE",
// "this one's wrong tho mixedTest  WRONGTEST"
// ]);

// decode([
// 'secret',
// 'Random text with secrets EVERYWHERE',
// 'secret HEREHERE and one secret OVERTHEREANDEVERYWHERE',
// 'secret SECRETTIME, and secret KINDATHERE.',
// 'secret ONELINER',
// 'and maybe secret FALSESE or secret TRUESECRET or secret ENDONCOMA,',
// 'here are three secrets one secret OVERHERE, one secret OVERTHERE and one secret DISSAPPOINT'
// ]);

// decode([
//     'multiSpace',
//     'multiSpace                                       ISFINEOK',
//     'multiSpace  isFAILLLLLL, but this multiSpace  ISN!O%T#$#FA$IL',
//     'and this one too multiSpace    !!##$$%%$$##!!, multiSpace    JJJSF%%#!',
//     'and a wrong one now multiSpace    HUE_HUE_HUE'
// ]);