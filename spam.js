const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });


  await page.goto("https://www.fakenamegenerator.com/gen-random-gr-as.php");
  // get name
  let element = await page.$("#details > div.content > div.info > div > div.address > h3");
  let name = await page.evaluate(el => el.textContent, element);
  element = await page.$("#details > div.content > div.info > div > div.address > div");

  // trim the strange address format
  let addr = await page.evaluate(el => el.textContent, element);
  addr = addr.trim();
  let plzort = addr.match("[0-9]{4}\ [A-Z]{1,20}");
  let stra = addr.match("[A-Z]{1}[a-z]{1,25}\ [0-9]{1,2}");
  
  // generated domains suck, we make our own
  // we want our own domains to look more real ;-)
  let domains = ["hotmail.com", "hotmail.de", "live.com", "gmail.com", "yahoo.de", "gmx.at", "gmx.net", "gmx.de", "aon.at", "a1.net", "web.de", "bluewin.ch"];
  let email_rnd = Math.floor(Math.random() * domains.length);
  let email = name.split(" ")[0].toLowerCase()+"."+name.split(" ")[1].toLowerCase()+"@"+domains[email_rnd];
  console.log(email);
  console.log(name);
  console.log(stra[0]);
  console.log(plzort[0]);



  await page.goto("https://docs.google.com/forms/d/e/1FAIpQLScOneudrSBzKeDknLFxJaVsopem08byD4srfEMsDeZp36P80Q/viewform");

  await page.focus("#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(1) > div > div:nth-child(1) > div.quantumWizTextinputPaperinputEl.freebirdFormviewerComponentsQuestionTextShort.freebirdFormviewerComponentsQuestionTextTextInput.freebirdThemedInput.modeLight > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input");
  await page.keyboard.type(email);
  
  await page.focus("#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(2) > div > div > div.freebirdFormviewerComponentsQuestionTextRoot > div > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input");
  await page.keyboard.type(name);

  await page.focus("#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(3) > div > div > div.freebirdFormviewerComponentsQuestionTextRoot > div > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input");
  await page.keyboard.type(stra[0]);

  await page.focus("#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(4) > div > div > div.freebirdFormviewerComponentsQuestionTextRoot > div > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input");
  await page.keyboard.type(plzort[0]);

  await page.focus("#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(5) > div > div > div.freebirdFormviewerComponentsQuestionTextRoot > div > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input");
  await page.keyboard.type("Österreich");

  let rnd = Math.floor(Math.random()*3);
  let rnd_select = "";

  switch (rnd) {
      case 0:
          rnd_select = "#i25 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div";
      case 1:
          rnd_select = "#i28 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div";
      case 2:
          rnd_select = "#i31 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div";
  }

  await page.click(rnd_select);
  await page.click("#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewNavigationNavControls > div.freebirdFormviewerViewNavigationButtonsAndProgress > div > div > span > span");
  await page.waitForNavigation();
  console.log("[+] sent :-)");

  await browser.close();
})();