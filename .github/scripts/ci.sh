if [ -n $(git log --format=%s $(git describe --tags)..HEAD) ]
then
  content=`cat ./package.json`
  content="${content//'%'/'%25'}"
  content="${content//$'\n'/'%0A'}"
  content="${content//$'\r'/'%0D'}"
  
  echo $content
fi
