import torch
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
from ultralytics import YOLO
from torchvision import models
import os
import torch.nn as nn
from torchvision import transforms
from matplotlib.patches import Rectangle
from CharacterManager import Character,CharacterList


models_path = os.path.join(os.getcwd(),"models")
model_detect_path = os.path.join(models_path,"best.pt")
model_classify_path = os.path.join(models_path,"mobilenet_v1_one_piece.pth")
class_names = ['Ace',
 'Akainu',
 'Brook',
 'Chopper',
 'Crocodile',
 'Franky',
 'Jimbei',
 'Kurohige',
 'Law',
 'Luffy',
 'Mihawk',
 'Nami',
 'Rayleigh',
 'Robin',
 'Sanji',
 'Shanks',
 'Usopp',
 'Zoro']
class_names = sorted(class_names)
idx2label = {}
for i in range(len(class_names)):
    
    idx2label[i]=class_names[i]

class Model():

    def __init__(self):

        self.model_face_detect = YOLO(model_detect_path)
        self.model_classify_face = models.mobilenet_v2(pretrained=True)
        self.model_classify_face.classifier[1] = nn.Linear(self.model_classify_face.classifier[1].in_features, 18)
        self.model_classify_face.load_state_dict(torch.load(model_classify_path))
        self.model_classify_face.eval()

        self.transform = transforms.Compose([
        transforms.Resize((224, 224)),  # Resize input images to the required size for VGG
        transforms.ToTensor(),           # Convert images to PyTorch tensors
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize input images
        ])

    def predict(self,img):
        
        chList = CharacterList()
        print("hh")
        Res = self.model_face_detect(img)

        # Plot the image
        # img = Image.fromarray(img)
        # Iterate over each prediction result
        for res in Res:
            boxes = res.boxes.xyxy.cpu().numpy()
            confidences = res.boxes.conf.cpu().numpy()

            for i in range(len(boxes)):
                x, y, x_max, y_max = boxes[i]
                confidence = confidences[i]

                face_img = img.crop((x,y,x_max,y_max))
                
                face_img = self.preprocess(face_img)
                 
                with torch.no_grad():
                    face_pred = self.model_classify_face(face_img)

                _, predicted_idx = torch.max(face_pred, 1)
                label = idx2label[predicted_idx.item()]
                chList.add(Character(name=label,bbox=[int(x),int(y),int(x_max),int(y_max)],confidence=float(confidence)).to_dict())
        print(chList.to_dict())
        return chList.to_dict()
                

    def preprocess(self,img):

        img = self.transform(img)
        img = img.unsqueeze(0) 
        return img

    