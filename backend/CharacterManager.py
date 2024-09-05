class Character():

    def __init__(self,name="",bbox=[],confidence=100) -> None:
        
        self.name=name
        self.bbox = bbox
        self.confidence = confidence

    def to_dict(self):
        
        return {
            "name":self.name,
            "bbox":self.bbox,
            "confidence":self.confidence
        }
    
class CharacterList():

    def __init__(self) -> None:
        self.characters = {}
        self.counter=0

    def add(self,character:Character):

        self.characters[self.counter]=character
        self.counter+=1

    def to_dict(self):

        return self.characters
        